'use client';

import Image from 'next/image';
import UserProfile from '@images/UserProfile.png';

import { MessageCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { chatOption } from '@/api/options/chatOption';
import { User } from '@/types/moim';
import { useRouter } from 'next/navigation';

type PeopleCardProps = {
  user: User;
};

const PeopleCard = ({ user }: PeopleCardProps) => {
  const router = useRouter();

  const postJoinMutation = useMutation(chatOption.joinChat());

  return (
    <div className="flex flex-col items-center">
      <Image
        src={user.profile_image || UserProfile}
        alt={user.nickname}
        width={100}
        height={100}
        className="h-[85px] cursor-pointer rounded-full object-cover"
        onClick={() => router.push(`/moims/members?userId=${user.id}`)}
      />
      <p className="flex w-full items-center justify-center gap-0.5 overflow-hidden">
        <span className="truncate">{user.nickname}</span>
        <MessageCircle
          size={16}
          color="gray"
          onClick={() => postJoinMutation.mutate(user.id)}
          className="cursor-pointer"
        />
      </p>
    </div>
  );
};

export default PeopleCard;
