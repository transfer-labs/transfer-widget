import React, { type FunctionComponent } from 'react';
import { Line } from '../Skeleton/Line';
export const LoadingRoute: FunctionComponent = () => {
  return (
    <div className='flex flex-col gap-3 justify-center items-center w-full p-2'>
      <Line size='small' />
      <Line size='large' />
      <Line size='large' />
    </div>
  );
};
