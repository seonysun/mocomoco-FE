import { chatOption } from '@/api/options/chatOption';
import { Chats } from '@/types/chat';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export const useSocket = (room_id: string, access: string | null) => {
  const socketRef = useRef<WebSocket | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!room_id || !access) return;

    const SOCKET_URL = `wss://api.mocomoco.store/ws/chat/${room_id}/?token=${access}`;
    const socket = new WebSocket(SOCKET_URL);
    socketRef.current = socket;

    socket.onmessage = event => {
      try {
        const parsed = JSON.parse(event.data);

        queryClient.setQueryData<Chats[]>(
          chatOption.chatMessages(room_id).queryKey,
          old => {
            if (!old) return [parsed];
            return [...old, parsed];
          },
        );
      } catch (e) {
        console.error('메시지 파싱 실패:', e);
      }
    };

    return () => {
      socket.close();
    };
  }, [room_id, access, queryClient]);

  const sendMessage = (message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN && message.trim()) {
      const messagePayload = {
        message,
      };
      socketRef.current.send(JSON.stringify(messagePayload));
      return true;
    }
    return false;
  };

  return {
    sendMessage,
  };
};
