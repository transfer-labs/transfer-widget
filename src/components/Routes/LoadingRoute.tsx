import React, { type FunctionComponent } from 'react';
import { Line } from '../Skeleton/Line';
export const LoadingRoute: FunctionComponent = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center w-full h-full px-2 py-4'>
      <Line size='small' />
      <Line size='large' />
      <Line size='large' />
      <Line size='large' />
    </div>
  );
};
