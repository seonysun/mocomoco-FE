'use client';

import CommonInput from '@/components/common/input/Input';
import { useEffect, useRef, useState } from 'react';
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
  const { nickname, phone, intro, github_url, position_name, portfolio_url } =
    form;
  const user = useAuthStore(state => state.user);
  const updateUser = useAuthStore(state => state.updateUser);
  const deleteAccount = useDeleteAccount();

  const router = useRouter();

  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // placeholder 폰트 공통 지정
  const fontSize = 'text-base placeholder:text-sm md:placeholder:text-lg';

  const [debouncedPhone, setDebouncedPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [debouncedLinks, setDebouncedLinks] = useState({
    github_url: '',
    portfolio_url: '',
  });
  const [linkError, setLinkError] = useState('');

  const debounceGit = debouncedLinks.github_url;
  const debouncepofol = debouncedLinks.portfolio_url;

  // [링크 유효성 검사 기준]
  const isValidUrl = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed || trimmed === 'https://') return true;
    try {
      const parsed = new URL(trimmed);

      const isHttp = ['http:', 'https:'].includes(parsed.protocol);
      const hasDotInHostname = parsed.hostname.includes('.');

      return isHttp && hasDotInHostname;
    } catch {
      return false;
    }
  };

  // [전화번호 유효성 검사 기준]
  const isValidPhone = (phone: string): boolean => {
    return /^01[016789]-\d{3,4}-\d{4}$/.test(phone);
  };

  // 유효성 검사 [debounce]
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPhone(phone);
      setDebouncedLinks({
        github_url: form.github_url,
        portfolio_url: form.portfolio_url,
      });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [phone, form.github_url, form.portfolio_url]);

  // [연락처 유효성 검사 조건부]
  useEffect(() => {
    if (debouncedPhone && !isValidPhone(debouncedPhone)) {
      setPhoneError('연락처 형식이 올바르지 않습니다. [ ex. 010-1234-5678 ]');
    } else if (debouncedPhone && isValidPhone(debouncedPhone)) {
      setPhoneError('올바른 연락처 형식입니다.');
    } else {
      setPhoneError('');
    }
  }, [debouncedPhone]);

  // [링크 유효성 검사 조건부]
  useEffect(() => {
    // https:// 제외 텍스트 없을 경우 빈 문자열로 인식
    const github = debounceGit.trim();
    const portfolio = debouncepofol.trim();

    const isGitEmpty = !github || github === 'https://';
    const isPofolEmpty = !portfolio || portfolio === 'https://';

    const isGitValid = isValidUrl(github);
    const isPofolValid = isValidUrl(portfolio);
    if (!isGitEmpty && !isGitValid && !isPofolEmpty && !isPofolValid) {
      setLinkError(
        '모든 링크 형식이 올바르지 않습니다. [ ex. mocomoco.com/username ]',
      );
    } else if (!isGitEmpty && !isGitValid) {
      setLinkError(
        'GitHub 링크 형식이 올바르지 않습니다. [ ex. mocomoco.com/username ]',
      );
    } else if (!isPofolEmpty && !isPofolValid) {
      setLinkError(
        '포트폴리오 링크 형식이 올바르지 않습니다. [ ex. mocomoco.com/username ]',
      );
    } else if ((!isGitEmpty && isGitValid) || (!isPofolEmpty && isPofolValid)) {
      setLinkError('올바른 링크 형식입니다');
    } else {
      setLinkError('');
    }
  }, [debouncedLinks]);

  // [저장 버튼 핸들러]
  const handleSave = async () => {
    if (
      github_url &&
      portfolio_url &&
      !isValidUrl(portfolio_url) &&
      !isValidUrl(github_url)
    ) {
      alert(
        '링크는 http(s)://로 시작하고 유효한 도메인(TLD)을 포함해야 합니다. \n [ ex. mocomoco.com/username ]',
      );
      return;
    } else if (phone && !isValidPhone(phone)) {
      alert('전화번호 형식이 올바르지 않습니다. \n[ ex. 010-1111-2222 ]');
      return;
    }

    try {
      let profileImagePath = form.profile_image;

      if (file) {
        const uploadedImageUrl = await uploadImage(file);
        profileImagePath = uploadedImageUrl.startsWith('http')
          ? uploadedImageUrl
          : `https://api.mocomoco.store${encodeURI(uploadedImageUrl)}`;
      } else if (!profileImagePath && !file) {
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
          <div className="flex flex-col gap-[10px]">
            <CommonInput
              // label=""
              placeholder="연락처 [ ex. 010-1234-5678 ]"
              value={form.phone}
              onChange={e => updateField('phone', e.target.value)}
              box="line"
              className={fontSize}
            />
            <p
              className={`text-sm opacity-70 ${phoneError.includes('올바른') ? 'text-green-500' : 'text-red-500'}`}
            >
              {phoneError}
            </p>
          </div>
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
          <div className="flex flex-col gap-[10px]">
            <span className="font-semibold text-gray-600">Link</span>
            <p
              className={`text-sm opacity-70 ${linkError.includes('올바른') ? 'text-green-500' : 'text-red-500'}`}
            >
              {linkError}
            </p>
            <div className="flex flex-col gap-[5px]">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 select-none text-sm text-gray-500">
                  https://
                </span>
                <CommonInput
                  placeholder="Github 링크 추가"
                  value={form.github_url.replace(/^https?:\/\//, '')}
                  onChange={e => {
                    const value = e.target.value;
                    const cleaned = value.replace(/^https?:\/\//, '');

                    updateField('github_url', `https://${cleaned}`);
                  }}
                  box="line"
                  className={`${fontSize} py-2 pl-[60px]`}
                />
              </div>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 select-none text-sm text-gray-500">
                  https://
                </span>
                <CommonInput
                  placeholder="portfolio 링크 추가"
                  value={form.portfolio_url.replace(/^https?:\/\//, '')}
                  onChange={e => {
                    const value = e.target.value;
                    const cleaned = value.replace(/^https?:\/\//, '');

                    updateField('portfolio_url', `https://${cleaned}`);
                  }}
                  box="line"
                  className={`${fontSize} py-2 pl-[60px]`}
                />
              </div>
            </div>
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
