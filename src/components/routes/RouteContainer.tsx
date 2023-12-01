import React, { type FunctionComponent } from 'react';
import { type SupportedChain, type SupportedToken, type QuoteResult } from '@argoplatform/transfer-sdk';
import { Route } from './Route';
import { type WidgetState } from 'models/const';

export interface RouteContainerProps {
  quoteResult?: QuoteResult;
  fromChain?: SupportedChain;
  toChain?: SupportedChain;
  fromToken?: SupportedToken;
  toToken?: SupportedToken;
  widgetState: WidgetState;
}

export const RouteContainer: FunctionComponent<RouteContainerProps> = ({
  quoteResult,
  fromChain,
  fromToken,
  toChain,
  toToken,
  widgetState,
}) => {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className='flex flex-row justify-between w-full items-center'>
        <p className={'text-white font-manrope text-lg font-medium'}>Routes</p>
        {/* <a className='cursor-pointer'>
          <p className={'text-accent-color font-manrope text-sm font-medium'}>View Additional</p>
        </a> */}
      </div>
      <Route
        route={quoteResult?.bestRoute}
        fromChain={fromChain}
        toChain={toChain}
        fromToken={fromToken}
        toToken={toToken}
        widgetState={widgetState}
      />
    </div>
  );
};
