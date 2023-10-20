import React, { useMemo, useState } from 'react';
import ActionButton, {ActionButtonProps} from './ActionButton';

export interface TransferWidgetProps {
  actionbutton: ActionButtonProps;
}

const TransferWidget: React.FC<TransferWidgetProps> = ({ actionbutton }) => {
  const [buttonState, setButtonState] = useState('default');

  const { buttonLabel, bgColor, textColor } = useMemo(() => {
    let buttonLabel = '';
    let bgColor = '';
    let textColor = '';

    switch(buttonState) {
      case 'default':
        buttonLabel = "Select Tokens";
        bgColor = 'bg-component-bg';
        textColor = 'text-black';
        break;
      case 'review bridge':
        buttonLabel = 'Review Bridge';
        bgColor = 'bg-success-green';
        textColor = 'text-white';
        break;
      case 'error':
        buttonLabel = 'Error';
        bgColor = 'bg-failure-red';
        textColor = 'text-white';
        break;
      // Add more cases as needed
    }

    return { buttonLabel, bgColor, textColor };
  }, [buttonState]);

  return (
    <div>
      <a onClick={() => setButtonState('review bridge')}>
        <p>hi</p>
      </a>
      <ActionButton {...actionbutton} />
    </div>
  )
}

export default TransferWidget;