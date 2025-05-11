import { chatAPI } from '@/api/functions/chatAPI';
import { queryOptions } from '@tanstack/react-query';

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
};
