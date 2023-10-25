import React, { type FunctionComponent, useEffect, type ReactNode } from 'react';
import { type ActionButtonProps } from './ActionButton';
import { type TokenNetworkInputProps } from './TokenNetworkInput';
import { type RoutesProps } from './Routes/RouteList';
import { type GasErrorProps } from './Errors/GasError';
import { TransferWidgetContainer } from './TransferWidgetContainer';
import { TransferConext } from '../context/TransferContext';
import { Transfer } from '@argoplatform/transfer-sdk';

export interface TransferWidgetProps {
  actionbutton: ActionButtonProps;
  fromtokennetworkinput: TokenNetworkInputProps;
  totokennetworkinput: TokenNetworkInputProps;
  routes: RoutesProps;
  gaserror: GasErrorProps;
  fromTokenAddress?: string;
  toTokenAddress?: string;
  fromChainId?: number;
  toChainId?: number;
}

const transfer = new Transfer({
  apiKey: 'XXX',
});

export const TransferWidget: FunctionComponent<TransferWidgetProps> = ({
  actionbutton,
  fromtokennetworkinput,
  totokennetworkinput,
  routes,
  gaserror,
}): ReactNode => {
  // const

  useEffect(() => {
    // TODO: parse props here
    console.log(fromtokennetworkinput);
    console.log(totokennetworkinput);
  }, []);

  return (
    <TransferConext.Provider value={transfer}>
      <TransferWidgetContainer />
    </TransferConext.Provider>
  );
};
