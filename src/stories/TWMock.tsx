import React from 'react';
import { TransferWidget, type TransferWidgetProps } from '../components/TransferWidget';

export const TWMock: React.FunctionComponent = (props: TransferWidgetProps) => {
  return (
    <div className='w-[100vw] flex justify-center items-center h-[100vh]'>
      <TransferWidget {...props} />
    </div>
  );
};
