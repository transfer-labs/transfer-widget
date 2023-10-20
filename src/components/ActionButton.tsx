import React, {useState, useMemo} from 'react';

export type ActionButtonProps = {
  label: string;
  background: string;
  textColor: string;
};

const BASE_BUTTON_CLASSES =
  'cursor-pointer border-radius-6 rounded border-1 font-bold font-manrope font-weight-bold py-2 px-4 w-446 h-50';

const ActionButton: React.FC<ActionButtonProps> = ({ label, background, textColor }) => {
  
  return (
    <button className={`${BASE_BUTTON_CLASSES} ${background} ${textColor}`}>
      {label}
    </button>
  );
};

export default ActionButton;
