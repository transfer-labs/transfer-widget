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
    <div role='status' className='w-full animate-pulse'>
      <div className={`bg-zinc-800 rounded-full dark:bg-zinc-900 ` + lineClass()}></div>
    </div>
  );
};
