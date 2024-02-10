import React from 'react';
import { Line } from './Skeleton/Line';
import { ButtonTheme, type ButtonState } from '../models/const';
import { type WidgetTheme } from 'models/const';

export const ActionButton: React.FunctionComponent<ButtonState & { theme: WidgetTheme }> = ({
  label,
  type,
  theme,
  onClick,
}) => {
  const BASE_BUTTON_CLASSES = `border-radius-6 rounded border-1 ${
    theme === 'light' ? 'border-border-color-light' : 'border-border-color-dark'
  } font-manrope font-medium py-3 px-4 w-full flex justify-center items-center min-h-[50px] mt-4`;

  const _type = type ?? 'default';
  const { backgroundColor, textColor, hoverBackgroundColor, disabled } = ButtonTheme[_type];
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
