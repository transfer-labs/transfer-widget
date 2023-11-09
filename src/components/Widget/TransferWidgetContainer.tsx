import React, { type FunctionComponent, type ReactNode, useState } from 'react';
import { TokenNetworkInput } from './TokenNetworkInput';
import { RouteContainer } from '../Routes/RouteContainer';
import { ErrorMessage } from '../errors/ErrorMessage';
import { SwitchArrow } from '../SwitchArrow';
import { ActionButton, type ActionButtonProps } from '../ActionButton';
import { type SupportedChain, type SupportedToken, type BridgeResult } from '@argoplatform/transfer-sdk';
import { motion, AnimatePresence } from 'framer-motion';
import { TokenNetworkSelector } from './TokenNetworkSelector';
import { type Direction } from 'models/const';
import { type ErrorType } from '../../models/const';
import { ReviewRoute } from './ReviewRoute';

export interface TransferWidgetContainerProps {
  supportedChains?: SupportedChain[];
  supportedTokens?: SupportedToken[];
  bridgeResult?: BridgeResult;
  fromChain?: SupportedChain;
  fromToken?: SupportedToken;
  toChain?: SupportedChain;
  toToken?: SupportedToken;
  handleChainSelect: (direction: Direction, chain?: SupportedChain) => void;
  handleTokenSelect: (direction: Direction, token?: SupportedToken) => void;
  setAmountToBeTransferred: (amount: string) => void;
  amountToBeTransferred?: string;
  buttonState: ActionButtonProps;
  estimateTransferValue?: string;
  error?: ErrorType;
}

export const TransferWidgetContainer: FunctionComponent<TransferWidgetContainerProps> = ({
  supportedChains,
  supportedTokens,
  fromChain,
  fromToken,
  toChain,
  toToken,
  buttonState,
  error,
  estimateTransferValue,
  amountToBeTransferred,
  bridgeResult,
  handleChainSelect,
  handleTokenSelect,
  setAmountToBeTransferred,
}): ReactNode => {
  const [widgetView, setWidgetView] = useState<
    'selectTokenNetworkFrom' | 'selectTokenNetworkTo' | 'review' | undefined
  >(undefined);

  function handleChainTokenSwitch(): void {
    const tempChain = fromChain;
    const tempToken = fromToken;
    handleChainSelect('from', toChain);
    handleTokenSelect('from', toToken);
    handleChainSelect('to', tempChain);
    handleTokenSelect('to', tempToken);
  }

  if (widgetView === 'review') {
    return (
      <AnimatePresence>
        {bridgeResult?.bestRoute !== undefined && (
          <ReviewRoute
            route={bridgeResult.bestRoute}
            fromChain={fromChain}
            toChain={toChain}
            fromToken={fromToken}
            toToken={toToken}
            buttonState={{
              label: 'Bridge',
            }}
          />
        )}
      </AnimatePresence>
    );
  }

  if (widgetView === 'selectTokenNetworkFrom' || widgetView === 'selectTokenNetworkTo') {
    return (
      <AnimatePresence>
        <TokenNetworkSelector
          chains={supportedChains}
          tokens={supportedTokens}
          selectedChain={widgetView === 'selectTokenNetworkFrom' ? fromChain : toChain}
          selectedToken={widgetView === 'selectTokenNetworkFrom' ? fromToken : toToken}
          handleChainSelect={handleChainSelect}
          handleTokenSelect={handleTokenSelect}
          direction={widgetView === 'selectTokenNetworkFrom' ? 'from' : 'to'}
          onClose={() => {
            setWidgetView(undefined);
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
            <p className='text-white font-manrope font-bold text-xl'>Transfer</p>
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
                    setWidgetView('selectTokenNetworkFrom');
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
                  amount={estimateTransferValue}
                  onAnchorClick={() => {
                    setWidgetView('selectTokenNetworkTo');
                  }}
                />
              </motion.div>
            </div>
          </div>
          {/* if the user doesn't have enough gas to make a valid transaction, display this error */}
          {error !== undefined ? <ErrorMessage errorType={error} /> : null}

          {/* if both the paramaters are fufilled animate in the routes component */}
          {bridgeResult !== undefined && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
            >
              <RouteContainer
                bridgeResult={bridgeResult}
                fromChain={fromChain}
                toChain={toChain}
                fromToken={fromToken}
                toToken={toToken}
                error={error}
              />
            </motion.div>
          )}

          {/* animate in the button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
          >
            <ActionButton {...buttonState} />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
