import React, { type FunctionComponent, type ReactNode } from 'react';
import { TokenNetworkInput } from './TokenNetworkInput';
import { RouteContainer } from '../Routes/RouteContainer';
import { ErrorMessage } from '../Message/ErrorMessage';
import { SwitchArrow } from '../SwitchArrow';
import { ActionButton } from '../ActionButton';
import {
  type SupportedChain,
  type SupportedToken,
  type QuoteResult,
  type BasicRoute,
} from '@argoplatform/transfer-sdk';
import { motion, AnimatePresence } from 'framer-motion';
import { TokenNetworkSelector } from './TokenNetworkSelector';
import { type ReviewState, type Direction, type SupportedTokensByChain } from 'models/const';
import { type WidgetState } from '../../models/const';
import { ReviewRoute } from './ReviewRoute';
import { useTransfer } from '../../hooks/useTransfer';
import { SettingsIcon } from '../Icons/SettingsIcon';
import { SettingsPage } from './SettingsPage';

export interface TransferWidgetContainerProps {
  supportedChains?: SupportedChain[];
  supportedTokensByChain?: SupportedTokensByChain;
  fromChain?: SupportedChain;
  fromToken?: SupportedToken;
  toChain?: SupportedChain;
  toToken?: SupportedToken;
  handleChainSelect: (direction: Direction, chain?: SupportedChain) => void;
  handleTokenSelect: (direction: Direction, token?: SupportedToken) => void;
  setAmountToBeTransferred: (amount: string) => void;
  amountToBeTransferred?: string;
  quoteResult?: QuoteResult;
  userAddress?: string;
  widgetState: WidgetState;
  selectedRoute?: BasicRoute;
  reviewState?: ReviewState;
  setWidgetState: (state: WidgetState) => void;
  setSelectedRoute: (route: BasicRoute | undefined) => void;
}

export const TransferWidgetContainer: FunctionComponent<TransferWidgetContainerProps> = ({
  supportedChains,
  supportedTokensByChain,
  fromChain,
  fromToken,
  toChain,
  toToken,
  quoteResult,
  amountToBeTransferred,
  userAddress,
  widgetState,
  reviewState,
  selectedRoute,
  setWidgetState,
  handleChainSelect,
  handleTokenSelect,
  setAmountToBeTransferred,
  setSelectedRoute,
}): ReactNode => {
  const { calculateEstimatedValue } = useTransfer();

  function handleChainTokenSwitch(): void {
    const tempChain = fromChain;
    const tempToken = fromToken;
    handleChainSelect('from', toChain);
    handleTokenSelect('from', toToken);
    handleChainSelect('to', tempChain);
    handleTokenSelect('to', tempToken);
  }

  function getTokens(): SupportedToken[] | undefined {
    if (supportedTokensByChain === undefined) {
      return undefined;
    }

    if (widgetState.view === 'selectTokenNetworkFrom' && fromChain !== undefined) {
      return supportedTokensByChain[fromChain.chainId];
    }

    if (widgetState.view === 'selectTokenNetworkTo' && toChain !== undefined) {
      return supportedTokensByChain[toChain.chainId];
    }

    return undefined;
  }

  if (widgetState.view === 'settings') {
    return (
      <AnimatePresence>
        <SettingsPage 
          slippage = {.01}
          onClose={() => {
            setWidgetState({
              ...widgetState,
              error: undefined,
              view: 'default',
              loading: false,
              buttonState: {
                onClick: undefined,
                type: 'disabled',
                label: 'Select tokens',
              },
            });
          }}
        />
    </AnimatePresence>
    )
  }

  if (widgetState.view === 'review') {
    return (
      <AnimatePresence>
        {quoteResult?.bestRoute !== undefined && (
          <ReviewRoute
            route={quoteResult.bestRoute}
            fromChain={fromChain}
            toChain={toChain}
            fromToken={fromToken}
            toToken={toToken}
            widgetState={widgetState}
            reviewState={reviewState}
            amountToBeTransferred={amountToBeTransferred}
            onClose={() => {
              setWidgetState({
                ...widgetState,
                error: undefined,
                view: 'default',
                loading: false,
                buttonState: {
                  onClick: undefined,
                  type: 'disabled',
                  label: 'Select tokens',
                },
              });
            }}
          />
        )}
      </AnimatePresence>
    );
  }

  if (widgetState.view === 'selectTokenNetworkFrom' || widgetState.view === 'selectTokenNetworkTo') {
    return (
      <AnimatePresence>
        <TokenNetworkSelector
          chains={supportedChains}
          tokens={getTokens()}
          selectedChain={widgetState.view === 'selectTokenNetworkFrom' ? fromChain : toChain}
          selectedToken={widgetState.view === 'selectTokenNetworkFrom' ? fromToken : toToken}
          handleChainSelect={handleChainSelect}
          handleTokenSelect={handleTokenSelect}
          direction={widgetState.view === 'selectTokenNetworkFrom' ? 'from' : 'to'}
          onClose={() => {
            setWidgetState({
              view: 'default',
              error: undefined,
              loading: false,
              buttonState: {
                onClick: undefined,
                type: 'disabled',
                label: 'Select tokens',
              },
            });
          }}
        />
      </AnimatePresence>
    );
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className='inline-flex flex-col py-5 px-6 gap-6 border-1 rounded-lg border-border-color bg-modal-background sm:w-[90vw] sm:min-w-[300px] max-w-[475px]'>
          <div className='flex flex-col gap-3'>
            <div className ='flex flex-row w-full justify-between'>
              <div className='flex flex-row gap-3 items-center'>
                <p className='text-white font-manrope font-bold text-xl'>Transfer</p>
                <p className='text-gray-400 font-manrope font-light text-sm'>
                  {userAddress !== undefined
                    ? userAddress.substring(0, 5) + '...' + userAddress.substring(userAddress.length - 3)
                    : ''}
                </p>
              </div>
              <div className = 'p-1 rounded-md hover:bg-component-background cursor-pointer' 
                onClick={() => setWidgetState({
                      ...widgetState,
                      view: 'settings',
                })}
              >
                <SettingsIcon />
              </div>
            </div>

            <div className='relative flex flex-col gap-1'>
              {/* animate in the individual selectors */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
              >
                <TokenNetworkInput
                  chain={fromChain}
                  token={fromToken}
                  direction='from'
                  setAmount={setAmountToBeTransferred}
                  amount={amountToBeTransferred}
                  // balance='0.0'
                  onAnchorClick={() => {
                    setWidgetState({
                      ...widgetState,
                      view: 'selectTokenNetworkFrom',
                    });
                  }}
                />
              </motion.div>

              {/* animate in the individual selectors */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5, type: 'spring', bounce: 0.3 }}
              >
                <SwitchArrow onClick={handleChainTokenSwitch} />
              </motion.div>

              {/* animate in the individual selectors */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
              >
                <TokenNetworkInput
                  chain={toChain}
                  token={toToken}
                  direction='to'
                  // balance='0.0'
                  amount={
                    toToken !== undefined && quoteResult !== undefined
                      ? calculateEstimatedValue(toToken, quoteResult.bestRoute.dstAmountEstimate)
                      : '0'
                  }
                  onAnchorClick={() => {
                    setWidgetState({
                      ...widgetState,
                      view: 'selectTokenNetworkTo',
                    });
                  }}
                />
              </motion.div>
            </div>
          </div>
          {widgetState.error !== undefined ? <ErrorMessage errorType={widgetState.error} /> : null}

          {/* if both the paramaters are fufilled animate in the routes component */}
          {quoteResult !== undefined && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
            >
              <RouteContainer
                quoteResult={quoteResult}
                fromChain={fromChain}
                toChain={toChain}
                fromToken={fromToken}
                toToken={toToken}
                widgetState={widgetState}
                selectedRoute={selectedRoute}
                setSelectedRoute={setSelectedRoute}
              />
            </motion.div>
          )}

          {/* animate in the button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
          >
            <ActionButton {...widgetState.buttonState} />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
