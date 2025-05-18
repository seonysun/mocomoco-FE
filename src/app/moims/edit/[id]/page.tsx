import MoimEditForm from '@/components/moim/moimeditform';

interface Props {
  params: { id: number };
}

export default async function moimEdit({ params }: Props) {
  return (
    <>
      <MoimEditForm id={params.id} />
    </>
  );
}
