import React from 'react';

export interface TextButtonProps {
  label: string;
}

function TextButton({ label }: TextButtonProps) {
  return (
    <>
      <button>{label}</button>
    </>
  );
}

export default TextButton;
