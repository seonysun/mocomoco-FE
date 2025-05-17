import MoimMemberCard from '@/components/moim/moimmember';

interface Props {
  searchParams: {
    userId?: string;
  };
}

const MemberPage = ({ searchParams }: Props) => {
  const userId = Number(searchParams.userId);

  if (!userId) {
    return <div>유저 ID가 없습니다</div>;
  }

  return <MoimMemberCard params={{ userId: String(userId) }} />;
};

export default MemberPage;
