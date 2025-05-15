export const modalStyleMap = {
  chat: {
    size: 'h-[560px] w-[350px] bg-main-medium',
    position: 'fixed bottom-10 right-10',
  },
  menu: {
    size: 'h-[340px] w-[200px] border',
    position: 'absolute top-12 right-0',
  },
  notification: {
    size: 'max-h-[265px] w-[310px] border',
    position: 'absolute top-12 right-28',
  },
} as const;
