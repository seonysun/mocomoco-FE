import { MoimDetail } from '@/components/moim/moimdetail';

interface MoimProps {
  params: {
    id: number;
  };
}

const MoimDetailPage = ({ params }: MoimProps) => {
  return (
    <div>
      <MoimDetail id={params.id} />
    </div>
  );
};

export default MoimDetailPage;
