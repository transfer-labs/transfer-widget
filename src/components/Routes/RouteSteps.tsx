import React, { type FunctionComponent } from 'react';
import { type SupportedChain, type SupportedToken, type QuoteRoute } from '@argoplatform/transfer-sdk';
import { type WidgetTheme } from '../../models/const';
import { useRoutes } from '../../hooks/useRoutes';

interface RouteStepsProps {
  route: QuoteRoute;
  toToken: SupportedToken;
  toChain: SupportedChain;
  fromToken: SupportedToken;
  fromChain: SupportedChain;
  theme: WidgetTheme;
}

export const RouteSteps: FunctionComponent<RouteStepsProps> = ({
  route,
  theme,
  fromToken,
  toToken,
  fromChain,
  toChain,
}) => {
  const { getRouteSteps } = useRoutes();
  const textColor = theme === 'light' ? 'text-primary-dark' : 'text-accent-color';
  const steps = getRouteSteps(route, fromChain, toChain, fromToken, toToken);
  return (
    <div className='flex p-1'>
      <div className='relative'>
        <div className='absolute w-[1px] bg-zinc-400 left-0 top-0 bottom-0 transform translate-x-[3px]'></div>
        {steps.map((item, index) => (
          <div key={index} className='flex flex-row items-center my-2'>
            <div className={`bg-zinc-400 w-2 h-2 rounded-full`}></div>
            <div className='flex flex-row ml-2 text-left gap-2 items-center'>
              {item.logoUri !== null && <img src={item.logoUri} className='w-3 h-3' />}
              <p className={`${textColor} font-manrope text-sm m-0`}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
