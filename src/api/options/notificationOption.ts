import { notificationAPI } from '@/api/functions/notificationAPI';
import { useChatStore } from '@/store/useChatStore';
import { useModalStore } from '@/store/useModalStore';
import { QueryClient, queryOptions } from '@tanstack/react-query';

export const notificationOption = {
  notiList: () =>
    queryOptions({
      queryKey: ['notification'],
      queryFn: () => notificationAPI.getNotiList(),
    }),
  patchRead: (queryClient: QueryClient) => ({
    mutationFn: (id: number) => notificationAPI.patchRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notification'],
      });
      useChatStore.getState().openModal();
      useModalStore.getState().close();
    },
    onError: (error: unknown) => {
      console.error('알림 확인 실패:', error);
    },
  }),
};
