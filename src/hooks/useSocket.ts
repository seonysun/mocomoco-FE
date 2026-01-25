import { Chats } from '@/types/chat';
import { useEffect, useRef, useState } from 'react';

export const useSocket = (room_id: string, access: string | null) => {
  const socketRef = useRef<WebSocket | null>(null);

  const [newMessage, setNewMessage] = useState<Chats[]>([]);

  useEffect(() => {
    setNewMessage([]);
  }, [room_id]);

  useEffect(() => {
    if (!room_id || !access) return;

    const SOCKET_URL = `wss://api.mocomoco.store/ws/chat/${room_id}/?token=${access}`;
    const socket = new WebSocket(SOCKET_URL);
    socketRef.current = socket;

    socket.onmessage = event => {
      try {
        const parsed = JSON.parse(event.data);
        setNewMessage(prev => [...prev, parsed]);
      } catch (e) {
        console.error('메시지 파싱 실패:', e);
      }
    };

    return () => {
      socket.close();
    };
  }, [room_id, access]);

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
    newMessage,
    sendMessage,
  };
};
