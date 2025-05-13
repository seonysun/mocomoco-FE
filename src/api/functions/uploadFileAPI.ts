'use client';

import { useAuthStore } from '@/store/useAuthStore';

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('profile_image_file', file);

  const accessToken = useAuthStore.getState().access;

  const response = await fetch(
    'https://api.mocomoco.store/api/auth/users/me/upload-image/',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Content-Type 설정 X (브라우저에서 처리)
      },
      body: formData,
    },
  );

  if (!response.ok) throw new Error('이미지 업로드 실패');

  const data = await response.json();
  return data.profile_image; // <- 서버에서 반환하는 이미지 URL
};
