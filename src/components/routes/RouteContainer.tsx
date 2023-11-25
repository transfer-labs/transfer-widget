import React, { type FunctionComponent } from 'react';
import { type SupportedChain, type SupportedToken, type QuoteResult } from '@argoplatform/transfer-sdk';
import { Route } from './Route';
import { type WidgetState, type ErrorType } from 'models/const';

export interface RouteContainerProps {
  quoteResult?: QuoteResult;
  widgetState?: WidgetState;
  fromChain?: SupportedChain;
  toChain?: SupportedChain;
  fromToken?: SupportedToken;
  toToken?: SupportedToken;
  error?: ErrorType;
}

export const RouteContainer: FunctionComponent<RouteContainerProps> = ({
  quoteResult,
  error,
  fromChain,
  fromToken,
  widgetState,
  toChain,
  toToken,
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
        error={error}
        widgetState={widgetState}
      />
    </div>
  );
};
