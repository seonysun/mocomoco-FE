'use client';

import { useState } from 'react';
import FloatingButton from '@/components/common/button/FloatingButton';
import ChatRooms from '@/components/chats/ChatRooms';
import Modal from '@/components/common/modal/Modal';
import ChatMessage from '@/components/chats/ChatMessage';

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAlarm] = useState(false);
  const [chatType, setChatType] = useState<'private' | 'group'>('private');

  return (
    <main className="p-6">
      {isChatOpen ? (
        <Modal onClose={() => setIsChatOpen(false)}>
          {/* <ChatRooms
            chatRoomList={[
              {
                roomId: 'a1b2c3',
                postId: 12,
                postTitle: '강남 모각코 구해요!',
                latestMessage: '내일 14시에 시작해요~',
                latestTime: '2025-04-25T19:40:00',
                unreadCount: 2,
                participants: ['우중', '지안', '승우'],
              },
              {
                roomId: 'a1b2c3',
                postId: 12,
                postTitle: '강남 모각코 구해요!',
                latestMessage: '내일 14시에 시작해요~',
                latestTime: '2025-04-25T19:40:00',
                unreadCount: 0,
                participants: ['우중', '지안', '승우'],
              },
            ]}
            chatType={chatType}
            setChatType={setChatType}
          /> */}
          <ChatMessage
            chats={[
              {
                roomId: 'aa',
                messageId: 5,
                userId: 7,
                username: '우중',
                content: '안녕하세요!',
                createdAt: '2025-04-25T15:30:00',
              },
              {
                roomId: 'aa',
                messageId: 6,
                userId: 2,
                username: '지안',
                content: '몇시에 만나실래요?',
                createdAt: '2025-04-25T15:31:02',
              },
            ]}
          />
        </Modal>
      ) : (
        <FloatingButton
          alarm={isAlarm}
          handleOpen={() => setIsChatOpen(true)}
        />
      )}
    </main>
  );
}
