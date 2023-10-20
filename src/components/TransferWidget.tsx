import React, { useMemo, useState } from 'react';
import ActionButton, {ActionButtonProps} from './ActionButton';

export interface TransferWidgetProps {
  actionbutton: ActionButtonProps;
}

const TransferWidget: React.FC<TransferWidgetProps> = ({ actionbutton }) => {
  return (
    <div>
      <ActionButton {...actionbutton} />
    </div>
  )
}

export default TransferWidget;