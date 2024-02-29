import React, { type FunctionComponent } from 'react';
import { type WidgetTheme } from '../../models/const';
import { AnimatePresence } from 'framer-motion';

interface WidgetContainerProps {
  children: React.ReactNode;
  autoSize: boolean;
  theme?: WidgetTheme;
}
export const WidgetContainer: FunctionComponent<WidgetContainerProps> = ({ children, autoSize, theme }) => {
  const maxWidth = !autoSize ? 'max-w-[475px]' : '';
  return (
    <div
      className={`flex flex-col py-5 px-6 gap-3 border-1 rounded-lg ${
        theme === 'light' ? 'border-border-color-light' : 'border-border-color-dark'
      } ${
        theme === 'light' ? 'bg-modal-background-light' : 'bg-modal-background-dark'
      } min-h-[400px] min-w-[340px] w-full ${maxWidth}`}
    >
      <AnimatePresence>{children}</AnimatePresence>
    </div>
  );
};
