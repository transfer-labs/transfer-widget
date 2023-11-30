import React, { type FunctionComponent } from 'react';

export interface SuccessMessageProps {
  text: string;
}

export const SuccessMessage: FunctionComponent<SuccessMessageProps> = ({ text }) => {
  return (
    <div className='flex flex-row justify-center items-center bg-component-bg border-1 border-success-green rounded-lg px-2 py-2'>
      <p className='font-manrope text-sm text-success-green'>{text}</p>
    </div>
  );
};
