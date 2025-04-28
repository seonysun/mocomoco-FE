import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: 'green' | 'red' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

export default ButtonProps;
