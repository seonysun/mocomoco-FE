import { fetchClient } from '@/api/fetchClient';

export const userAPI = {
  getUser: async () => {
    return fetchClient('/api/auth/user/', 'GET', { isAuth: true });
  },
  editUser: async (body: {
    nickname: string;
    phone?: string;
    intro?: string;
    github_url?: string;
    position_name: string;
    portfolio_url?: string;
    profile_image?: string;
  }) => {
    return fetchClient('/api/auth/user/', 'PATCH', {
      isAuth: true,
      body,
    });
  },
};
