'use client';

import NotificationCard from '@/components/notifications/NotificationCard';
import { notification } from '@/mockup/nofitication';

type NotisProps = {
  onClose: () => void;
};

const Notifications = ({ onClose }: NotisProps) => {
  const notiList = notification;

  return (
    <>
      <p className="mb-1 text-main-dark">알림</p>
      {notiList && notiList.length > 0 ? (
        <div className="space-y-1 overflow-y-auto scroll-smooth">
          {notiList.map(noti => (
            <button
              key={noti.Notification_id}
              onClick={onClose}
              className="w-full text-start"
            >
              <NotificationCard notification={noti} />
            </button>
          ))}
        </div>
      ) : (
        <>
          <p className="text-center text-sm text-main-dark">
            새로운 알림이 없어요
          </p>
        </>
      )}
    </>
  );
};

export default Notifications;
