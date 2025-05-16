import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { userAPI } from '@api/functions/userAPI';

export const useDeleteAccount = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const deleteAccountHandler = async () => {
    const confirmDelete = confirm(
      '정말 탈퇴하시겠습니까? 탈퇴 시 모든 정보가 삭제됩니다.',
    );

    if (!confirmDelete) return;

    try {
      await userAPI.deleteUser();

      logout(); // 상태 초기화
      router.push('/auth/login');
      alert('회원 탈퇴가 완료되었습니다. 다시 만나요 💚');
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      alert('탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return deleteAccountHandler;
};
