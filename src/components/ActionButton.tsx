import React from 'react';
import { Line } from './Skeleton/Line';
import { type WidgetState, WidgetStateTheme } from '../models/const';

export interface ActionButtonProps {
  label?: string;
  type?: WidgetState;
  onClick?: () => void;
}

const BASE_BUTTON_CLASSES =
  'border-radius-6 rounded border-1 border-border-color font-manrope font-medium py-3 px-4 w-full flex justify-center items-center min-h-[50px]';

export const ActionButton: React.FunctionComponent<ActionButtonProps> = ({ label, type, onClick }) => {
  const _type = type ?? 'default';
  const { backgroundColor, textColor, hoverBackgroundColor, disabled } = WidgetStateTheme[_type];
  const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${BASE_BUTTON_CLASSES} ${backgroundColor} ${hoverBackgroundColor} ${textColor} ${cursor}`}
      disabled={disabled}
      onClick={onClick}
    >
      {type === 'loading' ? <Line /> : label}
    </button>
  );
};
