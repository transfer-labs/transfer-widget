import React, { type FunctionComponent, type ReactNode } from 'react';
import { TokenNetworkInput } from './TokenNetworkInput';
import { RouteContainer } from '../Routes/RouteContainer';
import { ErrorMessage } from '../Message/ErrorMessage';
import { SwitchArrow } from '../SwitchArrow';
import { ActionButton } from '../ActionButton';
import {
  type SupportedChain,
  type SupportedToken,
  type QuoteBridgeResult,
  type BasicRoute,
} from '@argoplatform/transfer-sdk';
import { motion } from 'framer-motion';
import { TokenNetworkSelector } from './TokenNetworkSelector';
import {
  type ReviewState,
  type Direction,
  type SupportedTokensByChain,
  type Settings,
  type WidgetTheme,
} from 'models/const';
import { type WidgetState } from '../../models/const';
import { ReviewRoute } from './ReviewRoute';
import { useTransfer } from '../../hooks/useTransfer';
import { SettingsIcon } from '../Icons/SettingsIcon';
import { SettingsPage } from './SettingsPage';
import { TransferLogo } from '../Icons/TransferLogo';

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
  quoteResult?: QuoteBridgeResult;
  userAddress?: string;
  widgetState: WidgetState;
  selectedRoute?: BasicRoute;
  reviewState?: ReviewState;
  setWidgetState: (state: WidgetState) => void;
  setSelectedRoute: (route: BasicRoute | undefined) => void;
  setSettings: (settings: Settings) => void;
  settings: Settings;
  autoSize: boolean;
  theme?: WidgetTheme;
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
  settings,
  setWidgetState,
  handleChainSelect,
  handleTokenSelect,
  setAmountToBeTransferred,
  setSelectedRoute,
  setSettings,
  theme,
  autoSize,
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
      return supportedTokensByChain[fromChain.chain_id];
    }

    if (widgetState.view === 'selectTokenNetworkTo' && toChain !== undefined) {
      return supportedTokensByChain[toChain.chain_id];
    }

    return undefined;
  }

  if (widgetState.view === 'settings') {
    return (
      <SettingsPage
        autoSize={autoSize}
        settings={settings}
        setSettings={setSettings}
        theme={theme ?? 'default'}
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
    );
  }

  if (widgetState.view === 'review' && selectedRoute !== undefined) {
    return (
      <ReviewRoute
        autoSize={autoSize}
        route={selectedRoute}
        fromChain={fromChain}
        toChain={toChain}
        fromToken={fromToken}
        toToken={toToken}
        widgetState={widgetState}
        reviewState={reviewState}
        theme={theme ?? 'default'}
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
    );
  }

  if (widgetState.view === 'selectTokenNetworkFrom' || widgetState.view === 'selectTokenNetworkTo') {
    return (
      <TokenNetworkSelector
        chains={supportedChains}
        tokens={getTokens()}
        selectedChain={widgetState.view === 'selectTokenNetworkFrom' ? fromChain : toChain}
        selectedToken={widgetState.view === 'selectTokenNetworkFrom' ? fromToken : toToken}
        handleChainSelect={handleChainSelect}
        handleTokenSelect={handleTokenSelect}
        autoSize={autoSize}
        theme={theme ?? 'default'}
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
    );
  }
  return (
    <div className='w-full'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-3 items-center'>
              <TransferLogo />
              <p className={`text-${theme === 'light' ? 'black' : 'white'} font-manrope font-bold text-xl`}>Transfer</p>
              <p className='text-gray-400 font-manrope font-light text-sm'>
                {userAddress !== undefined
                  ? userAddress.substring(0, 5) + '...' + userAddress.substring(userAddress.length - 3)
                  : ''}
              </p>
            </div>
            <div
              className={`p-1 rounded-md ${
                theme === 'light' ? 'hover:bg-component-background-light' : 'hover:bg-component-background-dark'
              } cursor-pointer`}
              onClick={() => {
                setWidgetState({
                  ...widgetState,
                  view: 'settings',
                });
              }}
            >
              <SettingsIcon theme={theme ?? 'default'} />
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
                theme={theme}
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
              <SwitchArrow onClick={handleChainTokenSwitch} theme={theme} />
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
                theme={theme}
                // balance='0.0'
                amount={
                  toToken !== undefined && quoteResult !== undefined
                    ? calculateEstimatedValue(toToken, quoteResult.best_route.dst_amount_estimate)
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
        {widgetState.error !== undefined ? (
          <ErrorMessage errorType={widgetState.error} theme={theme ?? 'default'} />
        ) : null}

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
              theme={theme ?? 'default'}
            />
          </motion.div>
        )}

        {/* animate in the button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
        >
          <ActionButton {...widgetState.buttonState} theme={theme ?? 'default'} />
        </motion.div>
      </motion.div>
    </div>
  );
};
