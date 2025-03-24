import React from 'react';
import { Skeleton } from './common/Skelton';

const LoadingContainer: React.FC = () => {
  return (
    <div className="px-10 py-5 min-h-screen">
      <div className="space-y-4">
        <Skeleton className="w-full h-80 rounded-3xl mt-14" />
        <div className='flex gap-5 mt-5'>
          <Skeleton className="w-1/3 h-100" />
          <Skeleton className="w-1/3 h-100" />
          <Skeleton className="w-1/3 h-100" />
        </div>
      </div>
    </div>
  );
};

export default LoadingContainer;
