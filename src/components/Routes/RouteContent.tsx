import React, { type FunctionComponent, useState, type ReactNode } from 'react';
import { TokenNetworkImage } from '../Widget/TokenNetworkImage';
import { RouteDetails } from './RouteDetails';
import { DefaultTooltip } from '../Tooltip/DefaultTooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { type SupportedChain, type SupportedToken, type QuoteRoute } from '@argoplatform/transfer-sdk';
import { BestRouteIcon } from '../Icons/BestRouteIcon';
import { RouteSteps } from './RouteSteps';
import { type WidgetTheme } from '../../models/const';
import { useTokenUtils } from '../../hooks/useTokenUtils';

interface RouteContentProps {
  route: QuoteRoute;
  toToken: SupportedToken;
  toChain: SupportedChain;
  fromToken: SupportedToken;
  fromChain: SupportedChain;
  theme: WidgetTheme;
  isBest: boolean;
}

export const RouteContent: FunctionComponent<RouteContentProps> = ({
  route,
  toToken,
  toChain,
  fromToken,
  fromChain,
  theme,
  isBest,
}): ReactNode => {
  const [viewRouteSteps, setViewRouteSteps] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toTokenReadable } = useTokenUtils();

  return (
    <>
      {/* top routes and best icon (if route is the best) */}
      <div className='flex flex-row justify-between w-full'>
        <p className={theme === 'light' ? 'text-black' : 'text-white' + ' font-manrope text-md font-semibold'}>
          Transfer
        </p>
        {isBest && (
          <DefaultTooltip label='Best route based on price, speed, and slippage' side='left'>
            <BestRouteIcon theme={theme} />
          </DefaultTooltip>
        )}
      </div>

      <div className={`flex flex-col ${viewRouteSteps ? 'gap-2' : 'gap-0'}`}>
        {/* token, bridge info (unexpanded), and expanded button  */}
        <div className='relative flex flex-row justify-between w-full items-start sm:items-center'>
          <div className='flex flex-row gap-1 items-center justify-center'>
            <TokenNetworkImage tokenLogo={toToken.logo_uri} networkLogo={toChain?.logo_uri} />
            <div className='flex flex-col'>
              <p className={theme === 'light' ? 'text-black' : 'text-white' + ' font-manrope text-xl font-medium'}>
                {toTokenReadable(toToken.decimals, route.amount)} {toToken.symbol}
              </p>
              <div className='flex flex-row gap-1 items-center'>
                <p
                  className={
                    theme === 'light' ? 'text-primary-dark' : 'text-accent-color' + ' font-manrope text-sm font-medium'
                  }
                >
                  {toChain?.name}
                </p>

                {/* {_route.bridgeProvider !== undefined && (
                    <>
                      <DividerCircle theme={theme} />
                      <div className='flex flex-row gap-.25 items-center'>
                        <img src={_route.bridgeProvider?.logoUri} className='w-4 h-4' />
                        <p
                          className={
                            theme === 'light'
                              ? 'text-primary-dark'
                              : 'text-accent-color' + ' font-manrope text-sm font-medium'
                          }
                        >
                          {capitalize(_route.bridgeProvider.name)}
                        </p>
                      </div>
                    </>
                  )} */}
              </div>
            </div>
          </div>

          <div
            className='absolute right-0 top-1/2 transform -translate-y-1/2'
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
            onClick={() => {
              setViewRouteSteps(!viewRouteSteps);
            }}
            style={{
              transition: 'transform 0.3s ease-in-out',
              transform: viewRouteSteps ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <DefaultTooltip label='View route steps' side='left'>
              <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect
                  x='0.5'
                  y='0.5'
                  width='29'
                  height='29'
                  rx='8.5'
                  fill={theme === 'light' ? '#FBFBFB' : '#242424'}
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M14.5 10C14.7761 10 15 10.2239 15 10.5V19.2929L18.1464 16.1465C18.3417 15.9512 18.6583 15.9512 18.8536 16.1465C19.0488 16.3417 19.0488 16.6583 18.8536 16.8535L14.8536 20.8536C14.7598 20.9473 14.6326 21 14.5 21C14.3674 21 14.2402 20.9473 14.1465 20.8536L10.1465 16.8535C9.95118 16.6583 9.95118 16.3417 10.1465 16.1465C10.3417 15.9512 10.6583 15.9512 10.8536 16.1465L14 19.2929V10.5C14 10.2239 14.2239 10 14.5 10Z'
                  fill={theme === 'light' ? '#000000' : 'white'}
                />
                <rect
                  x='0.5'
                  y='0.5'
                  width='29'
                  height='29'
                  rx='8.5'
                  stroke={
                    isHovered ? (theme === 'light' ? 'black' : 'white') : theme === 'light' ? '#E5E7EB' : '#2A2A2E'
                  }
                />
              </svg>
            </DefaultTooltip>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {viewRouteSteps && (
            <motion.div
              key='content'
              initial='collapsed'
              animate='open'
              exit='collapsed'
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <RouteSteps
                route={route}
                toToken={toToken}
                toChain={toChain}
                fromToken={fromToken}
                fromChain={fromChain}
                theme={theme}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* icons regarding the route details */}
      {/* TODO: Replace */}
      <RouteDetails
        gas={'$0.00'}
        fees={'$0.00'}
        time={'~2 min'}
        steps={route.dexs.length + (route.bridgeProvider !== undefined ? 1 : 0)}
      />
    </>
  );
};
