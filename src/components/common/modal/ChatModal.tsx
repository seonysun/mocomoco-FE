import useClickOutside from '@/hooks/useClickOutside';
import { CircleX } from 'lucide-react';
import { useRef } from 'react';

type chatModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const ChatModal = ({ children, onClose }: chatModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  const modalSize = 'h-[560px] w-[360px]';
  const modalClass = `fixed bottom-10 right-10 z-30 flex flex-col justify-between rounded-3xl bg-main-medium p-5 shadow-xl transition-all duration-300 ease-out ${modalSize}`;

  return (
    <div ref={modalRef} className={modalClass} aria-label="chat modal">
      <CircleX className="absolute right-5 cursor-pointer" onClick={onClose} />
      {children}
    </div>
  );
};

export default ChatModal;
