import { create } from 'zustand';

type NotificationKey = 'chat' | 'join' | 'schedule';

type NotificationState = {
  values: Record<NotificationKey, boolean>;
  setValue: (key: NotificationKey, next: boolean) => void;
};

export const useNotificationStore = create<NotificationState>(set => ({
  values: {
    chat: false,
    join: false,
    schedule: false,
  },
  setValue: (key, next) =>
    set(state => ({
      values: { ...state.values, [key]: next },
    })),
}));
