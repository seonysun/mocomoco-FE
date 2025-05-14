import { chatAPI } from '@/api/functions/chatAPI';
import { QueryClient, queryOptions } from '@tanstack/react-query';

export const chatOption = {
  chatRoomList: () =>
    queryOptions({
      queryKey: ['chat', 'rooms'],
      queryFn: () => chatAPI.getChatRoomList(),
    }),
  chatMessages: (room_id: string) =>
    queryOptions({
      queryKey: ['chat', 'messages', room_id],
      queryFn: () => chatAPI.getChatMessages(room_id),
    }),
  joinChat: () => ({
    mutationFn: (other_user_id: number) =>
      chatAPI.postJoinChat({ other_user_id }),
    onSuccess: () => {
      //zustand enterRoom 상태변경
    },
    onError: (error: unknown) => {
      console.error('채팅 참여 실패:', error);
    },
  }),
  postMessage: (room_id: string, queryClient: QueryClient) => ({
    mutationFn: (content: string) => chatAPI.postMessages(room_id, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chat', 'messages', room_id],
      });
    },
    onError: (error: unknown) => {
      console.error('전송 실패:', error);
    },
  }),
  deleteMessage: (room_id: string, queryClient: QueryClient) => ({
    mutationFn: (chatMessage_id: number) =>
      chatAPI.deleteMessages(room_id, chatMessage_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chat', 'messages', room_id],
      });
    },
    onError: (error: unknown) => {
      console.error('삭제 실패:', error);
    },
  }),
};
