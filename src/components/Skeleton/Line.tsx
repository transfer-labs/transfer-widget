import React from 'react';

interface LineProps {
  size?: 'small' | 'large';
}
export const Line: React.FunctionComponent<LineProps> = ({ size = 'large' }) => {
  const lineClass = (): string => {
    switch (size) {
      case 'small':
        return 'h-3 w-1/2';
      case 'large':
        return 'h-2 w-full';
    }
  };

  return (
    <div role='status' className='animate-pulse flex w-full'>
      <div className={`bg-zinc-700 rounded-full ${lineClass()}`}></div>
    </div>
  );
};
