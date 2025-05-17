import { fetchClient } from '@/api/fetchClient';
import { MyMoim } from '@/types/mymoim';

export const myMoimAPI = {
  getLikedList: async (): Promise<MyMoim[]> => {
    return fetchClient('/posts/liked/', 'GET', { isAuth: true });
  },
  getJoinedList: async (): Promise<MyMoim[]> => {
    return fetchClient('/posts/joined/', 'GET', { isAuth: true });
  },
  cancelMyMoim: async (id: number) => {
    return fetchClient(`/posts/${id}/cancel/`, 'DELETE', {
      isAuth: true,
    });
  },
};
