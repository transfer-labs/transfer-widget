import React, { type FunctionComponent, type ReactNode } from 'react';
import { TokenNetworkInput } from './TokenNetworkInput';
import { type RoutesProps, RouteList } from './Routes/RouteList';
import { type GasErrorProps, GasError } from './Errors/GasError';
import { SwitchArrow } from './SwitchArrow';
import { ActionButton, type ActionButtonProps } from './ActionButton';
import { type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';

export interface TransferWidgetContainerProps {
  routes: RoutesProps;
  gasErrorProps: GasErrorProps;

  supportedChains?: SupportedChain[];
  fromChain?: SupportedChain;
  fromToken?: SupportedToken;
  toChain?: SupportedChain;
  toToken?: SupportedToken;
  amountToBeTransferred?: string;
  buttonState: ActionButtonProps;
}

export const TransferWidgetContainer: FunctionComponent<TransferWidgetContainerProps> = ({
  routes,
  gasErrorProps,
  fromChain,
  fromToken,
  toChain,
  toToken,
  buttonState,
}): ReactNode => {
  return (
    <div className='inline-flex flex-col py-5 px-6 gap-6 border rounded-lg border-border-color bg-modal-background w-95vw sm:w-auto lg:max-w-[475px]'>
      <div className='flex flex-col gap-3'>
        <p className='text-white font-manrope font-bold text-xl'>Transfer</p>

        <div className='relative flex flex-col gap-1'>
          <TokenNetworkInput chain={fromChain} token={fromToken} direction='from' balance='0.0' />
          <SwitchArrow />
          <TokenNetworkInput chain={toChain} token={toToken} direction='to' balance='0.0' estimateTransferValue='1' />
        </div>
      </div>
      {routes.status === 'gas-error' ? <GasError {...gasErrorProps} /> : null}
      <RouteList {...routes} />
      <ActionButton {...buttonState} />
    </div>
  );
};
