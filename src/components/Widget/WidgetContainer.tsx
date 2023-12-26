import React, { type FunctionComponent } from 'react';
import { type WidgetTheme } from 'models/const';

interface WidgetContainerProps {
  children: React.ReactNode;
  autoSize: boolean;
  theme?: WidgetTheme;
}
export const WidgetContainer: FunctionComponent<WidgetContainerProps> = ({ children, autoSize, theme }) => {
  const width = autoSize ? 'w-full' : 'max-w-[475px]';
  return (
    <div
      className={`inline-flex flex-col py-5 px-6 gap-3 border-1 rounded-lg ${
        theme === 'light' ? 'border-border-color-light' : 'border-border-color-dark'
      } ${
        theme === 'light' ? 'bg-modal-background-light' : 'bg-modal-background-dark'
      } sm:w-[90vw] min-h-[400px] min-w-[300px] ${width}`}
    >
      {children}
    </div>
  );
};
