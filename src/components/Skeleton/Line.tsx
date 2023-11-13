import React from 'react';
export const Line: React.FunctionComponent = () => {
  return (
    <div role='status' className='max-w-sm animate-pulse'>
      <div className='h-2 bg-gray-500 rounded-full dark:bg-gray-700 max-w-[360px] min-w-[50px]'></div>
    </div>
  );
};
