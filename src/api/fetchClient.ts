import { useLogout } from '@/components/login/useLogout';
import { useAuthStore } from '@/store/useAuthStore';

const BASE_URL = 'https://api.mocomoco.store';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface FetchOptions extends RequestInit {
  isAuth?: boolean; //인증 필요 여부
  body?: any;
}

export const fetchClient = async (
  endpoint: string,
  method: Method,
  options: FetchOptions = {},
  params?: Record<string, any>,
) => {
  const { isAuth, headers, body, ...rest } = options;
  const { access, refresh, logout, setAuth, setToken } =
    useAuthStore.getState();

  if (isAuth && !access) throw new Error('로그인이 필요합니다');

  const queryString = params
    ? '?' + new URLSearchParams(params as Record<string, string>).toString()
    : '';

  const fetchWithToken = async (token: string | null) => {
    const safeHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(isAuth && typeof token === 'string' && token.trim()
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...(headers || {}),
    };

    const data = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
      method,
      headers: safeHeaders,
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    });
    return data;
  };

  let response = await fetchWithToken(access);

  // 액세스 토큰 만료 시 리프레시 시도
  if (response.status === 401 && isAuth && refresh && access) {
    const refreshed = await refreshAccessToken(refresh, access);
    if (refreshed) {
      // 스토어 -> 로컬스토리지로 변경
      // const newAccess = useAuthStore.getState().access;
      // 🍓 다시 보기
      response = await fetchWithToken(refreshed);
    } else {
      // logout();
      useLogout();
      window.location.href = '/auth/login';
      throw new Error('로그인이 만료되었습니다.');
    }
  }

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`API 요청 실패 (${response.status}): ${text}`);
  }
  try {
    return text ? JSON.parse(text) : null;
  } catch (e) {
    console.error('JSON 데이터 파싱 실패:', e);
    return null;
  }
};

// 리프레시 토큰으로 액세스 토큰 재발급
const refreshAccessToken = async (refresh: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) throw new Error();

    const data = await response.json();
    const { access } = data;

    if (access) {
      useAuthStore.getState().setToken(access);
    }
    return access;
  } catch (error) {
    console.error('리프레시 토큰 발급 실패:', error);
  }
};
