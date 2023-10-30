import React, { type FunctionComponent, type ReactNode, useState } from 'react';
import { TokenNetworkInput } from './TokenNetworkInput';
import { type RoutesProps } from '../routes/RouteList';
import { ErrorMessage, type ErrorMessageProps } from '../errors/ErrorMessage';
import { SwitchArrow } from '../SwitchArrow';
import { ActionButton, type ActionButtonProps } from '../ActionButton';
import { type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { motion, AnimatePresence } from 'framer-motion';
import { TokenNetworkSelector } from './TokenNetworkSelector';
import { type Direction } from 'models/const';

export interface TransferWidgetContainerProps {
  routes?: RoutesProps;
  supportedChains?: SupportedChain[];
  supportedTokens?: SupportedToken[];
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
  error?: ErrorMessageProps;
}

export const TransferWidgetContainer: FunctionComponent<TransferWidgetContainerProps> = ({
  routes,
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
  handleChainSelect,
  handleTokenSelect,
  setAmountToBeTransferred,
}): ReactNode => {
  const [tokenNetworkSelectorDirection, setTokenNetworkSelectorDirection] = useState<Direction | undefined>(undefined);

  function handleChainTokenSwitch(): void {
    const tempChain = fromChain;
    const tempToken = fromToken;
    handleChainSelect('from', toChain);
    handleTokenSelect('from', toToken);
    handleChainSelect('to', tempChain);
    handleTokenSelect('to', tempToken);
    setAmountToBeTransferred('0');
  }

  return (
    <AnimatePresence>
      {tokenNetworkSelectorDirection !== undefined ? (
        <TokenNetworkSelector
          chains={supportedChains}
          tokens={supportedTokens}
          selectedChain={tokenNetworkSelectorDirection === 'from' ? fromChain : toChain}
          selectedToken={tokenNetworkSelectorDirection === 'from' ? fromToken : toToken}
          handleChainSelect={handleChainSelect}
          handleTokenSelect={handleTokenSelect}
          direction={tokenNetworkSelectorDirection}
          onClose={() => {
            setTokenNetworkSelectorDirection(undefined);
          }}
        />
      ) : (
        // else, display the widget with the inputs
        // animate in the entire widget
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
                      setTokenNetworkSelectorDirection('from');
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
                      setTokenNetworkSelectorDirection('to');
                    }}
                  />
                </motion.div>
              </div>
            </div>
            {/* if the user doesn't have enough gas to make a valid transaction, display this error */}
            {error !== undefined ? <ErrorMessage {...error} /> : null}

            {/* if both the paramaters are fufilled animate in the routes component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
            >
              {/* <Routes {...routes} /> */}
            </motion.div>

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
      )}
    </AnimatePresence>
  );
};
