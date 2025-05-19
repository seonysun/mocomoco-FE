import MoimMemberCard from '@/components/moim/moimmember';

interface Props {
  params: {
    id: number;
  };
}

const members = ({ params }: Props) => {
  if (!params.id) {
    return <div>유저 ID가 없습니다</div>;
  }

  return <MoimMemberCard userId={params.id} />;
};

export default members;
