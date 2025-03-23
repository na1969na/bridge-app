import React from 'react';
import { Skeleton } from './Skelton';

const LoadingContainer: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="space-y-4">
        <Skeleton className="w-64 h-16" />
        <Skeleton className="w-64 h-16" />
        <Skeleton className="w-64 h-16" />
      </div>
    </div>
  );
};

export default LoadingContainer;
