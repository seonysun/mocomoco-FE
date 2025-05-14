import { fetchClient } from '@/api/fetchClient';
import { moimCard } from '@/types/moim';

export const myMoimAPI = {
  getLikedList: async (): Promise<moimCard[]> => {
    return fetchClient('/posts/liked/', 'GET', { isAuth: true });
  },
  getJoinedList: async (): Promise<moimCard[]> => {
    return fetchClient('/posts/joined/', 'GET', { isAuth: true });
  },
  cancelMyMoim: async (id: number) => {
    return fetchClient(`/posts/${id}/cancel/`, 'DELETE', {
      isAuth: true,
    });
  },
};
