'use client';

import { useEffect, useState } from 'react';
import { userAPI } from '@/api/functions/userAPI';

const useEditForm = () => {
  const [form, setForm] = useState({
    nickname: '',
    phone: '',
    intro: '',
    github_url: '',
    position_name: '',
    portfolio_url: '',
    email: '',
    profile_image: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const data = await userAPI.getUser();
      setForm({
        nickname: data.nickname || '',
        phone: data.phone || '',
        intro: data.intro || '',
        github_url: data.github_url || '',
        position_name: data.position_name || '',
        portfolio_url: data.portfolio_url || '',
        email: data.email || '',
        profile_image: data.profile_image || '',
      });
    };
    fetchUser();
  }, []);

  const updateField = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return { form, updateField, setForm };
};

export default useEditForm;
