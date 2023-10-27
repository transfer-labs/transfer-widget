import React from 'react'

export interface ActionButtonProps {
  label: string
  background: string
  hover: string | null
  textColor: string
  disabled: boolean
}

const BASE_BUTTON_CLASSES =
  'cursor-pointer border-radius-6 rounded border-1 border-border-color font-manrope font-medium py-3 px-4 w-full'

const ActionButton: React.FunctionComponent<ActionButtonProps> = ({ label, background, hover, textColor, disabled }) => {
  return (
    <button className={`${BASE_BUTTON_CLASSES} ${background} ${hover} ${textColor}`} disabled={disabled}>
      {label}
    </button>
  )
}

export default ActionButton
