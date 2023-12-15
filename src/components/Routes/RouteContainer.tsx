import React, { type FunctionComponent, useState } from 'react';
import {
  type SupportedChain,
  type SupportedToken,
  type QuoteResult,
  type BasicRoute,
} from '@argoplatform/transfer-sdk';
import { Route } from './Route';
import { type WidgetState } from 'models/const';
import { areBasicRoutesEqual } from '../../utils/routes';
import { AdditionalRoutes } from './AdditionalRoutes';

export interface RouteContainerProps {
  quoteResult: QuoteResult;
  fromChain?: SupportedChain;
  toChain?: SupportedChain;
  fromToken?: SupportedToken;
  toToken?: SupportedToken;
  widgetState: WidgetState;
  setSelectedRoute: (route: BasicRoute | undefined) => void;
  selectedRoute?: BasicRoute;
}

export const RouteContainer: FunctionComponent<RouteContainerProps> = ({
  quoteResult,
  fromChain,
  fromToken,
  toChain,
  toToken,
  widgetState,
  setSelectedRoute,
  selectedRoute,
}) => {
  const [showAdditionalRoutes, setShowAdditionalRoutes] = useState<boolean>(false);
  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className='flex flex-row justify-between w-full items-center'>
        <p className={'text-white font-manrope text-lg font-medium'}>Routes</p>

        <p
          className={'text-accent-color font-manrope text-sm font-medium cursor-pointer hover:underline'}
          onClick={() => {
            setShowAdditionalRoutes(!showAdditionalRoutes);
          }}
        >
          {showAdditionalRoutes ? 'View Best' : 'View Additional'}
        </p>
      </div>
      {showAdditionalRoutes ? (
        <AdditionalRoutes
          routes={quoteResult.alternateRoutes}
          fromChain={fromChain}
          toChain={toChain}
          fromToken={fromToken}
          toToken={toToken}
          widgetState={widgetState}
          setSelectedRoute={setSelectedRoute}
          selectedRoute={selectedRoute}
        />
      ) : (
        <Route
          route={quoteResult.bestRoute}
          fromChain={fromChain}
          toChain={toChain}
          fromToken={fromToken}
          toToken={toToken}
          widgetState={widgetState}
          setSelectedRoute={setSelectedRoute}
          isSelectedRoute={areBasicRoutesEqual(quoteResult.bestRoute, selectedRoute)}
          isBest
        />
      )}
    </div>
  );
};
