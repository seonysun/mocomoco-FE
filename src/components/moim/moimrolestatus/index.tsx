import { GetMoimList } from '@/types/moim';

export const MoimRoleStatus = ({
  role_status,
}: {
  role_status: GetMoimList['role_status'];
}) => {
  return (
    <div className="zw-44 absolute right-0 top-[40px] flex flex-col gap-2 rounded-md bg-main-default p-3 text-sm text-white shadow-lg">
      {role_status.frontend > 0 && <p>프론트엔드: {role_status.frontend}명</p>}
      {role_status.backend > 0 && <p>백엔드: {role_status.backend}명</p>}
      {role_status.designer > 0 && <p>디자이너: {role_status.designer}명</p>}
      {role_status.fullstack > 0 && <p>풀스택: {role_status.fullstack}명</p>}
    </div>
  );
};
