import React, { type FunctionComponent } from 'react';

interface WidgetContainerProps {
  children: React.ReactNode;
  autoSize: boolean;
}
export const WidgetContainer: FunctionComponent<WidgetContainerProps> = ({ children, autoSize }) => {
  const width = autoSize ? 'w-full' : 'max-w-[475px]';
  return (
    <div
      className={`inline-flex flex-col py-5 px-6 gap-3 border-1 rounded-lg border-border-color bg-modal-background sm:w-[90vw] min-h-[400px] min-w-[300px] ${width}`}
    >
      {children}
    </div>
  );
};
