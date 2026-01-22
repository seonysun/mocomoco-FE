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

  const [newMessage, setNewMessage] = useState<Chats[]>([]);
  const [inputValue, setInputValue] = useState('');

  const currentUserId = useAuthStore(state => state.user?.id!);
  const { selectedRoomTitle, exitRoom } = useChatStore();

  useEffect(() => {
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
  }, [SOCKET_URL]);

  const sendMessage = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN && inputValue.trim()) {
      const messagePayload = {
        message: inputValue,
      };
      socketRef.current.send(JSON.stringify(messagePayload));
      setInputValue('');
    }
  };

  const queryClient = useQueryClient();

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

  const { data: oldMessages = [] } = useQuery(chatOption.chatMessages(room_id));
  const allMessages = [...oldMessages, ...newMessage];

  const { otherId, otherImage } = useMemo(() => {
    const otherMsg = allMessages.find(
      msg => msg.chat_user_id !== currentUserId,
    );

    return {
      otherId: otherMsg?.chat_user_id,
      otherImage: otherMsg?.profile_image,
    };
  }, [allMessages, currentUserId]);
  const { data: otherProfile } = useQuery(chatOption.chatUser(otherId));
  const userProfileImage = otherProfile?.profile_image || otherImage || null;

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    setIsFirstLoad(true);
  }, [room_id]);

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
      <div className="flex-1 space-y-2.5 overflow-y-auto py-2 pr-1">
        {allMessages?.map((msg, i) => (
          <div
            key={msg.ChatMessage_id ?? `${msg.created_at}-${i}`}
            ref={i === allMessages.length - 1 ? lastMessageRef : null}
          >
            <ChatMessage
              message={msg}
              currentUserId={currentUserId}
              profileImage={userProfileImage}
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
          value={inputValue}
          className="flex-1 border-none text-sm text-gray-700 outline-none"
          placeholder="메시지를 입력하세요."
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit">
          <Send stroke="gray" size={20} className="cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default ChatMessages;
