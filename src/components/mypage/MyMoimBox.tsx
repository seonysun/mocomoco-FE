'use client';

type BoxProps = {
  title?: string;
  children: React.ReactNode;
};

const MyMoimBox = ({ title, children }: BoxProps) => {
  return (
    <section className="flex h-[75vh] flex-col gap-2 rounded-2xl bg-[#E1F0D3] p-8 shadow-sm">
      {title && (
        <h2 className="mb-8 text-center text-2xl font-semibold">{title}</h2>
      )}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {children}
      </div>
    </section>
  );
};

export default MyMoimBox;
