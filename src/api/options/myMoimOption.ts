import { myMoimAPI } from '@/api/functions/myMoimAPI';
import { useModalStore } from '@/store/useModalStore';
import { QueryClient, queryOptions } from '@tanstack/react-query';

export const myMoimOption = {
  likedList: () =>
    queryOptions({
      queryKey: ['mymoim', 'liked'],
      queryFn: () => myMoimAPI.getLikedList(),
    }),
  joinedList: () =>
    queryOptions({
      queryKey: ['mymoim', 'joined'],
      queryFn: () => myMoimAPI.getJoinedList(),
    }),
  cancelMyMoim: (queryClient: QueryClient) => ({
    mutationFn: (id: number) => myMoimAPI.cancelMyMoim(id),
    onSuccess: () => {
      useModalStore.getState().close();
      queryClient.invalidateQueries({
        queryKey: ['mymoim', 'joined'],
      });
    },
    onError: (error: unknown) => {
      console.error('모임 나가기 실패:', error);
    },
  }),
};
