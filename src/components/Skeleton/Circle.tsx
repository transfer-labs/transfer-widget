import React from 'react';

export const Circle: React.FunctionComponent = () => {
  return (
    <div role='status' className='animate-pulse'>
      <div className='rounded-full bg-zinc-700 h-10 w-10'></div>
    </div>
  );
};
