import React from 'react';

const ButtonTypes = {
  default: {
    backgroundColor: 'bg-success-green',
    textColor: 'text-black',
    hoverBackgroundColor: 'hover:bg-hover-green',
    disabled: false,
  },
  error: {
    backgroundColor: 'bg-failure-red',
    textColor: 'text-black',
    hoverBackgroundColor: 'hover:bg-hover-red',
    disabled: true,
  },
  disabled: {
    backgroundColor: 'bg-component-background',
    textColor: 'text-unselected-text',
    hoverBackgroundColor: null,
    disabled: true,
  },
};
export interface ActionButtonProps {
  label: string;
  type?: keyof typeof ButtonTypes;
}

const BASE_BUTTON_CLASSES =
  'cursor-pointer border-radius-6 rounded border-1 border-border-color font-manrope font-medium py-3 px-4 w-full';

export const ActionButton: React.FunctionComponent<ActionButtonProps> = ({ label, type }) => {
  const _type = type ?? 'default';
  const { backgroundColor, textColor, hoverBackgroundColor, disabled } = ButtonTypes[_type];

  return (
    <button
      className={`${BASE_BUTTON_CLASSES} ${backgroundColor} ${hoverBackgroundColor} ${textColor}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
