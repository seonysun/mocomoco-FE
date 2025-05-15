import React from 'react';
import Image from 'next/image';
import Loading from '@images/Loading.gif';

const LoadingSpinner = () => {
  return (
    <div className="flex h-full items-center justify-center opacity-30">
      <Image src={Loading} alt="Loading Spinner" width={400} height={400} />
    </div>
  );
};

export default LoadingSpinner;
