import React, { type FunctionComponent, type ReactNode } from 'react';

import { type SupportedChain, type SupportedToken, type QuoteRoute } from '@argoplatform/transfer-sdk';
import { type WidgetState, type WidgetTheme } from '../../models/const';
import { LoadingRoute } from './LoadingRoute';
import { RouteContent } from './RouteContent';

export interface RouteProps {
  route?: QuoteRoute;
  toToken?: SupportedToken;
  toChain?: SupportedChain;
  fromToken?: SupportedToken;
  fromChain?: SupportedChain;
  isBest?: boolean;
  widgetState: WidgetState;
  isSelectedRoute?: boolean;
  setSelectedRoute: (route: QuoteRoute | undefined) => void;
  theme: WidgetTheme;
}

export const DividerCircle = ({ theme }: { theme: WidgetTheme }): ReactNode => {
  return (
    <svg width='5' height='5' viewBox='0 0 5 5' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='2.5' cy='2.5' r='2.5' fill={theme === 'light' ? '#E2E2E2' : '#C4C4C4'} />
    </svg>
  );
};

export const Route: FunctionComponent<RouteProps> = ({
  route,
  toToken,
  toChain,
  fromChain,
  fromToken,
  widgetState,
  theme,
  setSelectedRoute,
  isBest = false,
  isSelectedRoute = false,
}) => {
  const RouteContainter = (): ReactNode => {
    if (widgetState.error !== undefined) {
      return (
        <p
          className={
            theme === 'light'
              ? 'text-failure-dark'
              : 'text-failure-red' + ' font-manrope text-md font-medium text-center'
          }
        >
          Unable to find successful route
        </p>
      );
    } else if (widgetState.loading) {
      return <LoadingRoute />;
    } else if (
      route !== undefined &&
      toToken !== undefined &&
      fromToken !== undefined &&
      fromChain !== undefined &&
      toChain !== undefined
    ) {
      return (
        <RouteContent
          isBest={isBest}
          route={route}
          fromChain={fromChain}
          toChain={toChain}
          fromToken={fromToken}
          toToken={toToken}
          theme={theme}
        />
      );
    } else {
      return null;
    }
  };

  const border = (): string => {
    if (widgetState.error !== undefined) {
      return theme === 'light' ? 'border-failure-dark' : 'border-failure-red';
    } else if (isSelectedRoute && !widgetState.loading) {
      return theme === 'light' ? 'border-success-dark' : 'border-success-green';
    } else {
      return theme === 'light' ? 'border-border-color-light' : 'border-border-color-dark';
    }
  };

  return (
    <div
      onClick={() => {
        setSelectedRoute(route);
      }}
      className={`flex flex-col w-full ${
        theme === 'light' ? 'bg-component-background-light' : 'bg-component-background-dark'
      } border ${border()} rounded-lg py-3 px-4 min-h-[158px] gap-4 cursor-pointer`}
    >
      <RouteContainter />
    </div>
  );
};
