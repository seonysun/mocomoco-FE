import { fetchClient } from '@/api/fetchClient';
import { Notification } from '@/types/modal';

export const notificationAPI = {
  getNotiList: async (): Promise<Notification[]> => {
    return fetchClient('/notifications/', 'GET', { isAuth: true });
  },
  patchRead: async (notification_id: number) => {
    return fetchClient(`/notifications/${notification_id}/read/`, 'PATCH', {
      isAuth: true,
    });
  },
};
