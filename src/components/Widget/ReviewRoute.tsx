import React, { type FunctionComponent, useState } from 'react';
import { DividerCircle } from '../routes/Route';
import { ActionButton, type ActionButtonProps } from '../ActionButton';
import { DefaultTooltip } from '../tooltips/DefaultTooltip';
import { GasInfo, FeeInfo, TimeInfo } from '../routes/RouteDetails';
import { AnimatePresence, motion } from 'framer-motion';
import { TokenNetworkImage } from './TokenNetworkImage';
import { type SupportedToken, type Route, type SupportedChain } from '@argoplatform/transfer-sdk';

export interface ReviewRouteProps {
  route: Route;
  buttonState: ActionButtonProps;
  fromToken?: SupportedToken;
  toToken?: SupportedToken;
  fromChain?: SupportedChain;
  toChain?: SupportedChain;
}

export const ReviewRoute: FunctionComponent<ReviewRouteProps> = ({
  route,
  buttonState,
  fromToken,
  toChain,
  fromChain,
  toToken,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className='inline-flex flex-col py-5 px-6 gap-6 border-1 rounded-lg border-border-color bg-modal-background sm:w-[90vw] sm:min-w-[300px] max-w-[475px]'>
        <div className='flex flex-row justify-between items-center'>
          <p className='text-white font-manrope font-medium text-xl'>Review Route</p>
          <div className='p-2 hover:bg-shadow-element hover:rounded-lg cursor-pointer'>
            <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'>
              <path
                fill='#fff'
                fillRule='evenodd'
                d='M6.854 3.146a.5.5 0 0 1 0 .708L3.707 7H12.5a.5.5 0 0 1 0 1H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
        >
          <div
            className={`flex flex-col gap-4 w-full items-start bg-component-background border-border-color border-1 rounded-lg py-3 px-4`}
          >
            <div className='flex flex-row justify-between w-full'>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
              >
                <p className={'text-white font-manrope text-md font-semibold'}>Bridge</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
              >
                <TimeInfo value={route.timeEstimate} color='accent-color' side='left' />
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <div className='flex flex-row gap-1 items-center justify-center'>
                <TokenNetworkImage tokenLogo={fromToken?.logoURI} networkLogo={fromChain?.logoURI} />
                <div className='flex flex-col'>
                  {/* <p className={'text-white font-manrope text-xl font-medium'}>
                    {routeprops.routetokenprops.fromTokenProps.SupportedTokensProps.fromToken.balance}{' '}
                    {routeprops.routetokenprops.toTokenProps.SupportedTokensProps.toToken.tokenName}
                  </p> */}
                  <div className='flex flex-row gap-1 items-center'>
                    <p className={'text-accent-color font-manrope text-sm font-medium'}>{fromChain?.name}</p>
                    <DividerCircle />
                    <div className='flex flex-row gap-.25 items-center'>
                      <img src={route.bridgeInfo.logoURI} className='w-4 h-4' />
                      <p className={'text-accent-color font-manrope text-sm font-medium'}>{route.bridgeInfo.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className='flex flex-row w-full justify-between'>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                <div className='flex flex-row gap-.25 items-center'>
                  <img src={route.bridgeInfo.logoURI} className='w-5 h-5' />
                  <p className={'text-accent-color font-manrope text-lg font-medium'}>{route.bridgeInfo.name}</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                <div
                  onMouseEnter={() => {
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                  onClick={() => {
                    setIsClicked(!isClicked);
                  }}
                  style={{
                    transition: 'transform 0.3s ease-in-out',
                    transform: isClicked ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <DefaultTooltip label='View route steps' side='left'>
                    <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <rect x='0.5' y='0.5' width='29' height='29' rx='8.5' fill='#242424' />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M14.5 10C14.7761 10 15 10.2239 15 10.5V19.2929L18.1464 16.1465C18.3417 15.9512 18.6583 15.9512 18.8536 16.1465C19.0488 16.3417 19.0488 16.6583 18.8536 16.8535L14.8536 20.8536C14.7598 20.9473 14.6326 21 14.5 21C14.3674 21 14.2402 20.9473 14.1465 20.8536L10.1465 16.8535C9.95118 16.6583 9.95118 16.3417 10.1465 16.1465C10.3417 15.9512 10.6583 15.9512 10.8536 16.1465L14 19.2929V10.5C14 10.2239 14.2239 10 14.5 10Z'
                        fill='white'
                      />
                      <rect x='0.5' y='0.5' width='29' height='29' rx='8.5' stroke={isHovered ? 'white' : '#2A2A2E'} />
                    </svg>
                  </DefaultTooltip>
                </div>
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {isClicked && (
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
                  <div className='flex flex-col gap-.5'>
                    <div className='flex flex-row gap-.25 items-center'>
                      <img src={route.bridgeInfo.logoURI} className='w-5 h-5' />
                      <p className={'text-accent-color font-manrope text-lg font-medium'}>{route.bridgeInfo.name}</p>
                    </div>
                    <p className='text-accent-color font-manrope text-sm m-0'>
                      Bridge from {fromToken?.name} to {toToken?.name} using {route.bridgeInfo.name}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <GasInfo value={route.transactionRequest.gasPrice?.toString()} color='unselected-text' side='right' />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <FeeInfo value={12} color='unselected-text' side='right' />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
              <div className='flex flex-row gap-1 items-center justify-center'>
                <TokenNetworkImage tokenLogo={toToken?.logoURI} networkLogo={toChain?.logoURI} />
                <div className='flex flex-col'>
                  {/* <p className={'text-white font-manrope text-xl font-medium'}>
                    {routeprops.routetokenprops.toTokenProps.SupportedTokensProps.toToken.balance}{' '}
                    {routeprops.routetokenprops.toTokenProps.SupportedTokensProps.toToken.tokenName}
                  </p> */}
                  <div className='flex flex-row gap-1 items-center'>
                    <p className={'text-accent-color font-manrope text-sm font-medium'}>{toChain?.name}</p>
                    <DividerCircle />
                    <div className='flex flex-row gap-.25 items-center'>
                      <img src={route.bridgeInfo.logoURI} className='w-4 h-4' />
                      <p className={'text-accent-color font-manrope text-sm font-medium'}>{route.bridgeInfo.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5, type: 'spring', bounce: 0.3 }}
        >
          <ActionButton {...buttonState} />
        </motion.div>
      </div>
    </motion.div>
  );
};
