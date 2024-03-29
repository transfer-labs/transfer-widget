import React, { type FunctionComponent, useState } from 'react';
import { ActionButton } from '../ActionButton';
import { FeeInfo, TimeInfo } from '../Routes/RouteDetails';
import { AnimatePresence, motion } from 'framer-motion';
import { TokenNetworkImage } from './TokenNetworkImage';
import { type SupportedToken, type SupportedChain, type QuoteRoute } from '@argoplatform/transfer-sdk';
import { type WidgetState, type ReviewState, type WidgetTheme } from '../../models/const';
import { ErrorMessage } from '../Message/ErrorMessage';
import { SuccessMessage } from '../Message/SuccessMessage';
import { PingText } from '../PingText';
import { LinkText } from '../LinkText';
import { FlipArrowIcon } from '../Icons/FlipArrowIcon';
import { useTokenUtils } from '../../hooks/useTokenUtils';
import { RouteSteps } from '../Routes/RouteSteps';
import { useRoutes } from '../../hooks/useRoutes';

export interface ReviewRouteProps {
  route: QuoteRoute;
  fromToken?: SupportedToken;
  toToken?: SupportedToken;
  fromChain?: SupportedChain;
  toChain?: SupportedChain;
  widgetState: WidgetState;
  theme: WidgetTheme;
  reviewState?: ReviewState;
  amountToBeTransferred?: string;
  onClose: () => void;
  autoSize: boolean;
}

export const ReviewRoute: FunctionComponent<ReviewRouteProps> = ({
  route,
  fromToken,
  toChain,
  fromChain,
  toToken,
  widgetState,
  theme,
  reviewState,
  amountToBeTransferred,
  autoSize,
  onClose,
}) => {
  const { toTokenReadable } = useTokenUtils();
  const { getEstimateTime, getTotalFees } = useRoutes();
  const [isArrowClicked, setIsArrowClicked] = useState(false);
  return (
    <div className='w-full'>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='flex flex-col gap-4'
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <div className='flex flex-row justify-between items-center'>
            <p className={theme === 'light' ? 'text-black' : 'text-white' + ' font-manrope font-medium text-xl'}>
              Review Route
            </p>
            <div
              className={`p-2 ${
                theme === 'light' ? 'hover:bg-shadow-element-light' : 'hover:bg-shadow-element-dark'
              } hover:rounded-lg cursor-pointer`}
              onClick={onClose}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'>
                <path
                  fill={theme === 'light' ? '#000' : '#fff'}
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
              className={`flex flex-col gap-4 w-full items-start ${
                theme === 'light'
                  ? 'bg-component-background-light border-border-color'
                  : 'bg-component-background-dark border-border-color-dark'
              } border-1 rounded-lg py-3 px-4`}
            >
              <div className='flex flex-row justify-between w-full'>
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
                >
                  <p
                    className={theme === 'light' ? 'text-black' : 'text-white' + ' font-manrope text-md font-semibold'}
                  >
                    Transfer
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
                >
                  <TimeInfo value={getEstimateTime(route.timeEstimate)} color='accent-color' side='left' />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <div className='flex flex-row gap-1 items-center justify-center'>
                  <TokenNetworkImage tokenLogo={fromToken?.logoUri} networkLogo={fromChain?.logoUri} />
                  <div className='flex flex-col'>
                    <p
                      className={theme === 'light' ? 'text-black' : 'text-white' + ' font-manrope text-xl font-medium'}
                    >
                      {amountToBeTransferred} {fromToken?.symbol}
                    </p>
                    <div className='flex flex-row gap-1 items-center'>
                      <p
                        className={
                          theme === 'light'
                            ? 'text-primary-dark'
                            : 'text-accent-color' + ' font-manrope text-sm font-medium'
                        }
                      >
                        {fromChain?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className='flex flex-row w-full justify-between'>
                <div className='flex flex-row items-center'>
                  {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                    <GasInfo value={'$1.32'} color='unselected-text' side='right' />
                  </motion.div> */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                    <FeeInfo value={getTotalFees(route.fees)} color='unselected-text' side='right' />
                  </motion.div>
                </div>
                <FlipArrowIcon
                  tooltipText='View Route Steps'
                  isClicked={isArrowClicked}
                  setIsClicked={setIsArrowClicked}
                  theme={theme}
                />
              </div>

              <AnimatePresence initial={false}>
                {isArrowClicked && (
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
                      theme={theme}
                      fromToken={fromToken as SupportedToken}
                      toToken={toToken as SupportedToken}
                      fromChain={fromChain as SupportedChain}
                      toChain={toChain as SupportedChain}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                <div className='flex flex-row gap-1 items-center justify-center'>
                  <TokenNetworkImage tokenLogo={toToken?.logoUri} networkLogo={toChain?.logoUri} />
                  <div className='flex flex-col'>
                    <p
                      className={theme === 'light' ? 'text-black' : 'text-white' + ' font-manrope text-xl font-medium'}
                    >
                      {toToken !== undefined && toTokenReadable(toToken.decimals, route.amount)} {toToken?.symbol}
                    </p>
                    <div className='flex flex-row gap-1 items-center'>
                      <p
                        className={
                          theme === 'light'
                            ? 'text-primary-dark'
                            : 'text-accent-color' + ' font-manrope text-sm font-medium'
                        }
                      >
                        {toChain?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          {widgetState.error !== undefined && <ErrorMessage errorType={widgetState.error} theme={theme} />}
          {reviewState?.state !== undefined && reviewState.state === 'started' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <div className='w-full flex justify-start p-2'>
                <PingText
                  status={
                    widgetState.error !== undefined ? 'error' : reviewState.state === 'started' ? 'loading' : 'error'
                  }
                  text='Executing transaction...'
                />
              </div>
            </motion.div>
          )}
          {reviewState?.txnHash !== undefined && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className='w-full flex flex-col justify-start p-2 gap-2'>
                <LinkText text='View on Block Explorer' link={`${fromChain?.blockExplorer}tx/${reviewState.txnHash}`} />
                {route.bridgeProvider !== undefined && (
                  <LinkText
                    text='View on Bridge Explorer'
                    link={`${route.bridgeProvider.bridgeExplorer}tx/${reviewState.txnHash}`}
                  />
                )}
              </div>
            </motion.div>
          )}
          {reviewState?.state !== undefined && reviewState.state === 'done' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <SuccessMessage text='Success!' />
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5, type: 'spring', bounce: 0.3 }}
          >
            <ActionButton {...widgetState.buttonState} theme={theme} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
