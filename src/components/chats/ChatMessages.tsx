'use client';

import ChatMessage from '@/components/chats/ChatMessage';
import { ChevronLeft, Send } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatOption } from '@/api/options/chatOption';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Chats } from '@/types/chat';

type MsgsProps = {
  room_id: string;
};

const ChatMessages = ({ room_id }: MsgsProps) => {
  const access = useAuthStore(state => state.access);
  const SOCKET_URL = `wss://api.mocomoco.store/ws/chat/${room_id}/?token=${access}`;
  const socketRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<Chats[]>([]);
  const [input, setInput] = useState('');
  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ 연결됨');
    };

    socket.onmessage = event => {
      try {
        const parsed = JSON.parse(event.data);
        setMessage(prev => [...prev, parsed]);
      } catch (e) {
        console.error('메시지 파싱 실패:', e);
      }
    };

    socket.onerror = event => {
      console.error('🚨 소켓 에러 발생:', event);

      // socket 자체 상태 출력
      if (socket.readyState === WebSocket.CLOSED) {
        console.error('❌ 상태: CLOSED');
      } else if (socket.readyState === WebSocket.CLOSING) {
        console.warn('⚠️ 상태: CLOSING 중');
      } else if (socket.readyState === WebSocket.CONNECTING) {
        console.warn('⏳ 상태: CONNECTING 중');
      } else if (socket.readyState === WebSocket.OPEN) {
        console.log('🟢 상태: OPEN');
      }
    };

    socket.onclose = event => {
      console.warn('❌ 소켓 연결 종료');
      console.warn('🔚 종료 코드:', event.code);
      console.warn('🔚 종료 이유:', event.reason);
      console.warn('🔚 wasClean:', event.wasClean);
    };

    return () => {
      socket.close();
    };
  }, [SOCKET_URL]);

  const sendMessage = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN && input.trim()) {
      const messagePayload = {
        message: input,
      };
      socketRef.current.send(JSON.stringify(messagePayload));
      setInput('');
    }
  };

  const currentUserId = useAuthStore(state => state.user?.id!);
  const { selectedRoomTitle, exitRoom } = useChatStore();

  const { data } = useQuery(chatOption.chatMessages(room_id));
  const oldMessages = data ?? [];

  const queryClient = useQueryClient();

  // const [inputValue, setInputValue] = useState('');
  // const postMessageMutation = useMutation(
  //   chatOption.postMessage(room_id, queryClient),
  // );
  // const handleSend = () => {
  //   if (inputValue.trim() === '') return;
  //   postMessageMutation.mutate(inputValue);
  //   setInputValue('');
  // };

  const deleteMessageMutation = useMutation(
    chatOption.deleteMessage(room_id, queryClient),
  );
  const handleDelete = (msgId: number) => {
    deleteMessageMutation.mutate(msgId);
  };

  const allMessages = useMemo(
    () => [...oldMessages, ...message],
    [oldMessages, message],
  );

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: isFirstLoad ? 'auto' : 'smooth',
    });
    if (isFirstLoad) setIsFirstLoad(false);
  }, [allMessages]);

  return (
    <div className="flex h-full flex-col p-1">
      <div className="flex items-center border-b border-main-base py-3">
        <button onClick={exitRoom}>
          <ChevronLeft stroke="gray" />
        </button>
        <span className="ml-1 font-bold">{selectedRoomTitle || '채팅방'}</span>
      </div>
      <div className="flex-1 space-y-2.5 overflow-y-auto py-2">
        {allMessages?.map((msg, i) => (
          <div
            key={msg.ChatMessage_id}
            ref={i === allMessages.length - 1 ? lastMessageRef : null}
          >
            <ChatMessage
              message={msg}
              currentUserId={currentUserId}
              handleDelete={() => handleDelete(msg.ChatMessage_id)}
            />
          </div>
        ))}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          // handleSend();
          sendMessage();
        }}
        className="flex items-center justify-between gap-2 rounded-xl bg-white p-3"
      >
        <input
          type="text"
          // value={inputValue}
          value={input}
          className="flex-1 border-none text-sm text-gray-700 outline-none"
          placeholder="메시지를 입력하세요."
          // onChange={e => setInputValue(e.target.value)}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">
          <Send stroke="gray" size={20} className="cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default ChatMessages;
