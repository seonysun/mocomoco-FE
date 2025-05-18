import { fetchClient } from '@/api/fetchClient';
import { Schedule } from '@/types/schedule';

export const scheduleAPI = {
  getScheduleList: async (postIds: number[]): Promise<Schedule[]> => {
    return fetchClient(
      '/posts/schedules/list/',
      'GET',
      { isAuth: true },
      { post_id: postIds },
    );
  },
  postSchedule: async (
    postId: number,
    body: { date: string; memo: string },
  ) => {
    return fetchClient(`/posts/${postId}/schedules/`, 'POST', {
      isAuth: true,
      body,
    });
  },
  deleteSchedule: async (postId: number) => {
    return fetchClient(`/posts/schedules/${postId}/delete/`, 'DELETE', {
      isAuth: true,
    });
  },
  updateSchedule: async (
    postId: number,
    body: { date: string; memo: string },
  ) => {
    return fetchClient(`/posts/schedules/${postId}/update/`, 'PATCH', {
      isAuth: true,
      body,
    });
  },
};
