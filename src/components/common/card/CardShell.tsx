'use client';

import AlarmBedge from '@/components/common/AlarmBedge';

type CardShellProps = {
  unread?: boolean;
  imageSlot?: React.ReactNode;
  titleSlot?: string;
  contentSlot?: string;
  timeSlot?: string | Date;
  className?: string;
};

const CardShell = ({
  unread,
  imageSlot,
  titleSlot,
  contentSlot,
  timeSlot,
  className,
}: CardShellProps) => {
  return (
    <div
      className={`relative rounded-2xl bg-[#FFFCFC] p-2 hover:brightness-95 ${className}`}
    >
      {unread && <AlarmBedge />}
      <div className="flex items-center">
        {imageSlot}
        <div className="ml-2 w-full">
          <div className="flex justify-between gap-1">
            <p className="flex-1 truncate text-sm font-bold text-black">
              {titleSlot}
            </p>
            {timeSlot && typeof timeSlot === 'string' && (
              <span className="text-right text-[10px] text-gray-400">
                {new Date(timeSlot).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
          </div>
          <p className="mt-[2px] line-clamp-1 truncate text-sm text-gray-600">
            {contentSlot || '\u00A0'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardShell;
