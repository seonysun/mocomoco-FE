export type ChatRoom = {
  room_id: string; //채팅방 id
  title: string;
  post_id: number; //게시글 id
  post_title: string; //게시글 명
  latest_message: string; //최근메시지
  latest_time: string; //최근메시지 전송시간
  unread_count: number; //안읽은 메시지
  participants: string[]; //참여자 리스트
};

export type Chats = {
  room_id: string; //채팅방 id
  ChatMessage_id: number; //메시지 id
  chat_user_id: number; //작성자 id
  nickname: string; //작성자 닉네임
  profile_image: string;
  content: string; //본문
  created_at: string; //전송시간
};
