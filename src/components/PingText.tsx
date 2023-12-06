import React, { type FunctionComponent } from 'react';

interface PingTextProps {
  status?: 'default' | 'error' | 'loading';
  text?: string;
}

export const PingText: FunctionComponent<PingTextProps> = ({ status = 'default', text }) => {
  let color = '';
  if (status === 'error') {
    color = 'bg-failure-red';
  } else if (status === 'loading') {
    color = 'bg-loading-yellow';
  } else {
    color = 'bg-success-green';
  }

  return (
    <div className='flex flex-row justify-center gap-3 items-center'>
      <span className='relative flex h-3 w-3'>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color}`}></span>
        <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`}></span>
      </span>
      <p className={'text-accent-color font-manrope text-sm font-medium'}>{text}</p>
    </div>
  );
};
