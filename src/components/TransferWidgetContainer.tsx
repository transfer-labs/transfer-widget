import React, { type FunctionComponent, useEffect, useState, type ReactNode } from 'react';
import { type TokenNetworkInputProps, TokenNetworkInput } from './TokenNetworkInput';
import { type RoutesProps, RouteList } from './Routes/RouteList';
import { type GasErrorProps, GasError } from './Errors/GasError';
import { SwitchArrow } from './SwitchArrow';
import { ActionButton } from './ActionButton';
import { type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';

export interface TransferWidgetContainerProps {
  fromTokenNetworkProps: TokenNetworkInputProps;
  toTokenNetworkProps: TokenNetworkInputProps;
  routes: RoutesProps;
  gasErrorProps: GasErrorProps;

  supportedChains: SupportedChain[];
}

export const TransferWidgetContainer: FunctionComponent<TransferWidgetContainerProps> = ({
  fromTokenNetworkProps,
  toTokenNetworkProps,
  routes,
  gasErrorProps,
}): ReactNode => {
  const [fromChain, setFromChain] = useState<SupportedChain | undefined>(undefined);
  const [fromToken, setFromToken] = useState<SupportedToken | undefined>(undefined);
  const [toChain, setToChain] = useState<SupportedChain | undefined>(undefined);
  const [toToken, setToToken] = useState<SupportedToken | undefined>(undefined);

  // Called when user selects option to select new token and network
  function handleSelectNewTokenNetwork(): void {
    console.log('pass');
  }

  return (
    <div className='inline-flex flex-col py-5 px-6 gap-6 border rounded-lg border-border-color bg-modal-background w-95vw sm:w-auto lg:max-w-[475px]'>
      <div className='flex flex-col gap-3'>
        <p className='text-white font-manrope font-bold text-xl'>Transfer</p>

        <div className='relative flex flex-col gap-1'>
          <TokenNetworkInput {...fromTokenNetworkProps} />
          <SwitchArrow />
          <TokenNetworkInput {...toTokenNetworkProps} />
        </div>
      </div>
      {routes.status === 'gas-error' ? <GasError {...gasErrorProps} /> : null}
      <RouteList {...routes} />
      <ActionButton />
    </div>
  );
};
