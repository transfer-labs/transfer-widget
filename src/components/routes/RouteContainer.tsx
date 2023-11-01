import React, { type FunctionComponent } from 'react';
import { type SupportedChain, type Route as RouteType, type SupportedToken } from '@argoplatform/transfer-sdk';
import { Route } from './Route';

export interface RouteContainerProps {
  routes?: RouteType[];
  fromChain?: SupportedChain;
  toChain?: SupportedChain;
  fromToken?: SupportedToken;
  toToken?: SupportedToken;
  status?: 'default' | 'selected' | 'error' | 'gas-error';
}

export const RouteContainer: FunctionComponent<RouteContainerProps> = ({ routes, status }) => {
  if (status === 'default') {
    return null;
  } else {
    return (
      <div className='flex flex-col gap-3 w-full'>
        <div className='flex flex-row justify-between w-full items-center'>
          <p className={'text-white font-manrope text-lg font-medium'}>Routes</p>
          <a className='cursor-pointer'>
            <p className={'text-accent-color font-manrope text-sm font-medium'}>View Additional</p>
          </a>
        </div>
        <Route />
      </div>
    );
  }
};
