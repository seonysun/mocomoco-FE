'use client';

import CommonInput from '@/components/common/input/Input';
import { useRef, useState } from 'react';
import Dropdown from '@/components/common/input/Dropdown';
import Button from '@/components/common/button/Button';
import { ROLE_LIST } from '@/constants/config';
import { useAuthStore } from '@/store/useAuthStore';
import { userAPI } from '@/api/functions/userAPI';
import { useRouter } from 'next/navigation';
import { uploadImage } from '@/api/functions/uploadFileAPI';
import useEditForm from '@/components/mypage/editForm';
import ProfileImageUploader from '../imgUpload';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';

export default function EditForm() {
  const { form, updateField, setForm } = useEditForm();
  const user = useAuthStore(state => state.user);
  const updateUser = useAuthStore(state => state.updateUser);
  const deleteAccount = useDeleteAccount();

  const router = useRouter();

  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // placeholder 폰트 공통 지정
  const fontSize = 'text-base placeholder:text-sm md:placeholder:text-lg';

  // [링크 유효성 검사]
  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);

      const isHttp = ['http:', 'https:'].includes(parsed.protocol);
      const hasValidTLD = /\.[a-z]{2,}$/i.test(parsed.hostname);

      return isHttp && hasValidTLD;
    } catch {
      return false;
    }
  };

  // [전화번호 유효성 검사]
  const isValidPhone = (phone: string) => {
    const phoneWithoutHyphen = phone.replace(/-/g, '');
    return /^01[016789]\d{7,8}$/.test(phoneWithoutHyphen);
  };

  // [저장 버튼 핸들러]
  const handleSave = async () => {
    const { nickname, phone, intro, github_url, position_name, portfolio_url } =
      form;
    if (
      github_url &&
      portfolio_url &&
      !isValidUrl(portfolio_url) &&
      !isValidUrl(github_url)
    ) {
      alert(
        '링크는 http(s)://로 시작하고 유효한 도메인(TLD)을 포함해야 합니다. \n예: https://github.com',
      );
      return;
    } else if (phone && !isValidPhone(phone)) {
      alert(
        '전화번호 형식이 올바르지 않습니다. \n예: 010-1234-5678 또는 01012345678',
      );
      return;
    }

    try {
      let profileImagePath = form.profile_image;

      if (file) {
        const uploadedImageUrl = await uploadImage(file);
        profileImagePath = uploadedImageUrl.startsWith('http')
          ? uploadedImageUrl
          : `https://api.mocomoco.store${encodeURI(uploadedImageUrl)}`;
      } else if (!previewUrl && !file) {
        profileImagePath = ''; // 삭제 처리
      }

      await userAPI.editUser({
        nickname,
        phone,
        intro,
        github_url,
        position_name,
        portfolio_url,
        profile_image: profileImagePath,
      });

      const updatedUser = await userAPI.getUser();
      updateUser(updatedUser);

      alert('정보가 저장되었습니다!');
      router.push('/mypage'); // 저장 후 마이페이지 이동도 가능
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <>
      <div className="mb-[20px] flex min-h-screen w-full items-center justify-center px-4">
        <div className="flex w-full max-w-[700px] flex-col justify-center gap-[50px] rounded-[20px] bg-white p-[30px] drop-shadow-md sm:p-[50px]">
          <p
            onClick={deleteAccount}
            className="cursor-pointer text-right text-sm underline transition-all duration-200 ease-in-out hover:-translate-y-1 hover:text-red-500 md:text-base"
          >
            회원탈퇴
          </p>
          <p className="text-center font-gmarket text-xl font-light md:text-[30px]">
            내정보 수정
          </p>
          <div className="flex items-center justify-center">
            <ProfileImageUploader
              imageUrl={previewUrl ?? form.profile_image ?? null}
              onImageChange={(selectedFile, previewUrl) => {
                setFile(selectedFile ?? undefined);
                if (!previewUrl) {
                  updateField('profile_image', ''); // 서버에 삭제 요청
                }
              }}
            />
          </div>
          <CommonInput
            // label=""
            placeholder="닉네임 [ 2글자 이상, 10글자 이하 ] "
            value={form.nickname}
            onChange={e => updateField('nickname', e.target.value)}
            box="line"
            className={fontSize}
          />
          <CommonInput
            // label=""
            placeholder="이메일 [ ex. user123@email.com ]"
            value={form.email}
            box="line"
            className={fontSize}
            // 이메일은 소셜로그인에 적용된 이메일만 사용 가능. 즉, 변경 불가
            readOnly
          />
          <CommonInput
            // label=""
            placeholder="연락처 [ ex. 010-1234-5678 ]"
            value={form.phone}
            onChange={e => updateField('phone', e.target.value)}
            box="line"
            className={fontSize}
          />
          <div className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-[200px]">
            <Dropdown
              selected={form.position_name}
              onSelect={value => updateField('position_name', value)}
              categories={ROLE_LIST as unknown as string[]}
              placeholder="분야"
              className="text-sm md:text-lg"
            />
          </div>
          <CommonInput
            // label=""
            placeholder="소개글 [ 본인을 소개해주세요 ! ]"
            value={form.intro}
            onChange={e => updateField('intro', e.target.value)}
            box="textarea"
            className={fontSize}
          />
          <div className="flex flex-col gap-[30px]">
            <CommonInput
              label="GitHub Link"
              placeholder="링크 추가"
              value={form.github_url}
              onChange={e => updateField('github_url', e.target.value)}
              box="line"
              className={fontSize}
            />
            <CommonInput
              label="portfolio Link"
              placeholder="링크 추가"
              value={form.portfolio_url}
              onChange={e => updateField('portfolio_url', e.target.value)}
              box="line"
              className={fontSize}
            />
          </div>
          <Button
            type="submit"
            className="w-[100px] self-center"
            onClick={handleSave}
          >
            저장
          </Button>
        </div>
      </div>
    </>
  );
}
