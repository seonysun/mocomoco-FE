'use client';

import NotificationCard from '@/components/notifications/NotificationCard';
import { Notification } from '@/types/modal';

type NotisProps = {
  notiList: Notification[];
};

const Notifications = ({ notiList }: NotisProps) => {
  return (
    <>
      <p className="text-main-dark mb-1">알림</p>
      {notiList && notiList.length > 0 ? (
        <div className="space-y-1 overflow-y-scroll scroll-smooth">
          {notiList.map(noti => (
            <NotificationCard key={noti.Notification_id} notification={noti} />
          ))}
        </div>
      ) : (
        <>
          <p className="text-main-dark text-center text-sm">
            새로운 알림이 없어요
          </p>
        </>
      )}
    </>
  );
};

export default Notifications;
