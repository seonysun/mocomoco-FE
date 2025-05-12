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
  const { access, refresh } = useAuthStore.getState();

  if (isAuth && !access) throw new Error('로그인이 필요합니다');

  const queryString = params
    ? '?' + new URLSearchParams(params as Record<string, string>).toString()
    : '';

  const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(isAuth && { Authorization: `Bearer ${access}` }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!response.ok) throw new Error(`error: ${response.status}`);

  return response.json();
};
