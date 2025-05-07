'use client';

import CommonInput from '@/components/common/input/Input';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '@images/Logo.png';
import Edit from '@images/edit.png';
import Dropdown from '@/components/common/input/Dropdown';
import Button from '@/components/common/button/Button';
import { ROLE_LIST } from '@/constants/config';

export default function EditForm() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [intro, setIntro] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('');

  const fontSize = 'text-base placeholder:text-sm md:placeholder:text-lg';

  // 이후 추가 구현 : useAuthStore 사용해서 정보가 있는 건 첫 렌더링 때 저장된 정보 띄우고 아니면 placeholder 띄우기
  return (
    <>
      <div className="mb-[20px] flex min-h-screen w-full items-center justify-center px-4">
        <div className="flex w-full max-w-[700px] flex-col justify-center gap-[50px] rounded-[20px] bg-white p-[30px] drop-shadow-md sm:p-[50px]">
          <p className="text-right text-sm underline md:text-base">
            {' '}
            회원탈퇴{' '}
          </p>
          <p className="text-center font-gmarket text-xl font-light md:text-[30px]">
            내정보 수정
          </p>
          <div className="flex w-full max-w-[300px] flex-col items-center justify-center self-center">
            <Image
              src={Logo}
              alt="User Image"
              className="h-[150px] w-[150px] self-center md:h-[200px] md:w-[200px]"
            />
            <Image
              src={Edit}
              alt="Edit"
              className="h-[15px] w-[15px] place-self-end"
            />
          </div>
          <CommonInput
            // label=""
            placeholder="닉네임 [ 2글자 이상, 10글자 이하 ] "
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            box="line"
            className={fontSize}
          />
          <CommonInput
            // label=""
            placeholder="이메일 [ ex. user123@email.com ]"
            value={email}
            onChange={e => setEmail(e.target.value)}
            box="line"
            className={fontSize}
          />
          <CommonInput
            // label=""
            placeholder="연락처 [ ex. 010-1234-5678 ]"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            box="line"
            className={fontSize}
          />
          <div className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-[200px]">
            <Dropdown
              selected={category}
              onSelect={setCategory}
              categories={[...ROLE_LIST]}
              placeholder="분야"
              className="text-sm md:text-lg"
            />
          </div>
          <CommonInput
            // label=""
            placeholder="소개글 [ 본인을 소개해주세요 ! ]"
            value={intro}
            onChange={e => setIntro(e.target.value)}
            box="textarea"
            className={fontSize}
          />
          <CommonInput
            // label=""
            placeholder="링크 추가"
            value={link}
            onChange={e => setLink(e.target.value)}
            box="line"
            className={fontSize}
          />
          <Button type="submit" className="w-[100px] self-center">
            {' '}
            저장{' '}
          </Button>
        </div>
      </div>
    </>
  );
}
