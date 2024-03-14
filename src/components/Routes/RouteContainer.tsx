import React, { type FunctionComponent, useState } from 'react';
import {
  type SupportedChain,
  type SupportedToken,
  type QuoteRouteResponse,
  type QuoteRoute,
} from '@argoplatform/transfer-sdk';
import { Route } from './Route';
import { type WidgetState, type WidgetTheme } from '../../models/const';
import { AdditionalRoutes } from './AdditionalRoutes';
import { useRoutes } from '../../hooks/useRoutes';

export interface RouteContainerProps {
  quoteResult: QuoteRouteResponse;
  fromChain?: SupportedChain;
  toChain?: SupportedChain;
  fromToken?: SupportedToken;
  toToken?: SupportedToken;
  widgetState: WidgetState;
  setSelectedRoute: (route: QuoteRoute | undefined) => void;
  selectedRoute?: QuoteRoute;
  theme: WidgetTheme;
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
  theme,
}) => {
  const { areRoutesEqual } = useRoutes();
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
          routes={quoteResult.alternativeRoutes}
          fromChain={fromChain}
          toChain={toChain}
          fromToken={fromToken}
          toToken={toToken}
          widgetState={widgetState}
          setSelectedRoute={setSelectedRoute}
          selectedRoute={selectedRoute}
          theme={theme}
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
          isSelectedRoute={areRoutesEqual(quoteResult.bestRoute, selectedRoute)}
          isBest
          theme={theme}
        />
      )}
    </div>
  );
};
