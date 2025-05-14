import { Moim, MoimPayload } from '@/types/moim';
import { fetchClient } from '../fetchClient';

export const moimsApi = {
  postMoims: async (payload: MoimPayload) => {
    return fetchClient('/posts/', 'POST', {
      isAuth: true,
      body: payload,
    });
  },
  getMoimsList: async () => {
    return fetchClient(`/posts/`, 'GET', { isAuth: false });
  },
  getMoimDetail: async (id: Number) => {
    return fetchClient(`/posts/${id}/`, 'GET', { isAuth: false });
  },
  deleteMoim: async (id: Number) => {
    return fetchClient(`/posts/${id}/`, 'DELETE', { isAuth: true });
  },
  editMoim: async (id: Number, payload: MoimPayload) => {
    return fetchClient(`/posts/${id}/`, 'PUT', {
      isAuth: true,
      body: payload,
    });
  },
  applyMoim: async (id: Number, role: string) => {
    return fetchClient(`/posts/${id}/apply/`, 'POST', {
      isAuth: true,
      body: role,
    });
  },
  likeMoim: async (id: Number) => {
    return fetchClient(`/posts/${id}/like/`, 'POST', { isAuth: true });
  },
  disLikeMoim: async (id: Number) => {
    return fetchClient(`/posts/${id}/like/`, 'DELETE', { isAuth: true });
  },
};
