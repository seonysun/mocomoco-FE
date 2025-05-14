import MoimForm from '@/components/moim/moimform';

export default function moimEdit() {
  // const data = await getMoimData(params.id);

  // const initialData = {
  //   title: data.title,
  //   content: data.content,
  //   moim: data.category,
  //   place: data.place,
  //   year: data.year,
  //   month: data.month,
  //   day: data.day,
  //   roles: data.roles,
  // };
  // API 연결시 MoimForm에 프롭 내려줘서 수정 가능한 로직 구현 예정
  return (
    <>
      <MoimForm />
    </>
  );
}
