import React, { type FunctionComponent } from 'react';
import { Line } from '../Skeleton/Line';
import { Circle } from '../Skeleton/Circle';
export const LoadingRoute: FunctionComponent = () => {
  return (
    <div className='flex flex-col gap-4 w-full h-full px-2 py-4 justify-start'>
      <Line size='small' />
      <div className='flex flex-row w-full gap-2'>
        <Circle />
        <div className='flex flex-col w-full gap-4'>
          <Line size='large' />
          <Line size='large' />
        </div>
      </div>

      <Line size='large' />
    </div>
  );
};
