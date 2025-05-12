import { notificationAPI } from '@/api/functions/notificationAPI';
import { queryOptions } from '@tanstack/react-query';

export const notificationOption = {
  notiList: () =>
    queryOptions({
      queryKey: ['notification'],
      queryFn: () => notificationAPI.getNotiList(),
    }),
};
