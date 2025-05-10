import React from 'react';
import Image from 'next/image';
import Loading from '@images/Loading.gif';

const LoadingSpinner = () => {
  return (
    <div className="mt-[200px] flex flex-col items-center justify-center gap-[30px] opacity-30">
      <Image src={Loading} alt="Loading Spinner" width={400} height={400} />
    </div>
  );
};

export default LoadingSpinner;
