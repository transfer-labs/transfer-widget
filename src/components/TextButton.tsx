import React from 'react';

type ButtonProps = {
    label: string
}

function TextButton({label}: ButtonProps) {
  return (
    <>
        <button>{label}</button>
    </>
  )
}

export default TextButton