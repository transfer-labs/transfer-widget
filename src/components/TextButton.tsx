import React from 'react';

export type TextButtonProps = {
    label: string
}

function TextButton({label}: TextButtonProps) {
  return (
    <>
        <button>{label}</button>
    </>
  )
}

export default TextButton