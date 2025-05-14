import { fetchClient } from '@/api/fetchClient';
import { ChatRoom, Chats } from '@/types/chat';

export const chatAPI = {
  getChatRoomList: async (): Promise<ChatRoom[]> => {
    return fetchClient('/chat/rooms/', 'GET', { isAuth: true });
  },
  getChatMessages: async (room_id: string): Promise<Chats[]> => {
    return fetchClient(`/chat/${room_id}/messages/`, 'GET', { isAuth: true });
  },
  postJoinChat: async (body: { other_user_id: number }) => {
    return fetchClient(`/chat/rooms/1to1/`, 'POST', {
      isAuth: true,
      body,
    });
  },
  postMessages: async (room_id: string, body: { content: string }) => {
    return fetchClient(`/chat/${room_id}/messages/send/`, 'POST', {
      isAuth: true,
      body,
    });
  },
  deleteMessages: async (room_id: string, chatMessage_id: number) => {
    return fetchClient(
      `/chat/${room_id}/messages/${chatMessage_id}/`,
      'DELETE',
      {
        isAuth: true,
      },
    );
  },
};
