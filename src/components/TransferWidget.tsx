import React, { type FunctionComponent, useEffect, type ReactNode, useState } from 'react';
import { TransferWidgetContainer } from './Widget/TransferWidgetContainer';
import { TransferContext } from '../context/TransferContext';
import { Transfer, type SupportedChain, type SupportedToken, type QuoteResult } from '@argoplatform/transfer-sdk';
import { useTransfer } from '../hooks/useTransfer';
import { type ErrorType, type Direction } from 'models/const';
import { type ActionButtonProps } from './ActionButton';
import { type ethers } from 'ethers';
import { type WidgetViewType } from '../models/const';

export interface TransferWidgetProps {
  fromChainId?: number;
  toChainId?: number;
  fromTokenAddress?: string;
  toTokenAddress?: string;
  amountToBeTransferred?: string;
  isTestnet?: boolean;
  userAddress?: string;
  signer?: ethers.Signer;
}

export const TransferWidget: FunctionComponent<TransferWidgetProps> = ({
  fromChainId,
  toChainId,
  fromTokenAddress,
  toTokenAddress,
  amountToBeTransferred,
  isTestnet,
  userAddress,
  signer,
}): ReactNode => {
  const transfer = new Transfer({
    isTestnet,
  });

  const [fromChain, setFromChain] = useState<SupportedChain | undefined>(undefined);
  const [toChain, setToChain] = useState<SupportedChain | undefined>(undefined);
  const [_amountToBeTransferred, setAmountToBeTransferred] = useState<string>(amountToBeTransferred ?? '');
  const [quoteResult, setQuoteResult] = useState<QuoteResult | undefined>(undefined);
  const { supportedChains, getSupportedTokens, supportedTokensByChain } = useTransfer({ transfer });
  const [error, setError] = useState<ErrorType | undefined>(undefined);
  const [fromToken, setFromToken] = useState<SupportedToken | undefined>(undefined);
  const [toToken, setToToken] = useState<SupportedToken | undefined>(undefined);
  const [buttonState, setButtonState] = useState<ActionButtonProps>({
    type: 'disabled',
    label: 'Select tokens',
  });
  const [widgetView, setWidgetView] = useState<WidgetViewType>(undefined);

  function handleReview(): void {
    setWidgetView('review');
    setButtonState({
      type: 'default',
      label: 'Bridge',
      onClick: executeBridge,
    });
  }

  function executeBridge(): void {
    if (
      fromChain !== undefined &&
      fromToken !== undefined &&
      toChain !== undefined &&
      toToken !== undefined &&
      _amountToBeTransferred !== undefined &&
      +_amountToBeTransferred > 0 &&
      error === undefined &&
      userAddress !== undefined
    ) {
      setButtonState({
        type: 'loading',
      });

      const bridgeBody = {
        srcChainId: fromChain.chainId,
        dstChainId: toChain.chainId,
        srcChainTokenAddress: fromToken.address,
        dstChainTokenAddress: toToken.address,
        qty: +_amountToBeTransferred,
        fromAddress: userAddress,
        toAddress: userAddress,
      };

      void transfer
        .bridge(bridgeBody)
        .then((result) => {
          if (result !== undefined && signer !== undefined) {
            transfer
              .executeBridge(result?.bestRoute, signer)
              .then((result) => {
                setButtonState({
                  type: 'default',
                  label: 'Success',
                });
              })
              .catch((error) => {
                console.error(error);
                setButtonState({
                  type: 'error',
                  label: 'Error',
                });
                setError('execute_bridge');
              });
          }
        })
        .catch((error) => {
          console.error(error);
          setButtonState({
            type: 'error',
            label: 'Error',
          });
          setError('retrieving_bridge_routes');
        });
    }
  }

  useEffect(() => {
    if (userAddress === undefined) {
      setButtonState({
        type: 'error',
        label: 'Error',
        onClick: undefined,
      });
      setError('no_user_wallet');
    } else if (
      fromChain !== undefined &&
      fromToken !== undefined &&
      toChain !== undefined &&
      toToken !== undefined &&
      _amountToBeTransferred !== undefined &&
      +_amountToBeTransferred > 0
    ) {
      setButtonState({
        type: 'loading',
      });
      // Ready to be bridged
      const bridgeBody = {
        srcChainId: fromChain.chainId,
        dstChainId: toChain.chainId,
        srcChainTokenAddress: fromToken.address,
        dstChainTokenAddress: toToken.address,
        qty: +_amountToBeTransferred,
        fromAddress: userAddress, // TODO: get from address
        toAddress: userAddress, // TODO: get to address
      };
      void transfer
        .quoteBridge(bridgeBody)
        .then((result) => {
          if (Object.keys(result.bestRoute).length === 0) {
            setQuoteResult(undefined);
            setError('no_bridge_routes');
            setButtonState({
              type: 'error',
              label: 'Error',
              onClick: undefined,
            });
          } else {
            setQuoteResult(result);
            setError(undefined);
            setButtonState({
              type: 'default',
              label: 'Review',
              onClick: handleReview,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          setError('retrieving_bridge_routes');
          setButtonState({
            type: 'error',
            label: 'Error',
            onClick: undefined,
          });
        });
    } else {
      setButtonState({
        type: 'disabled',
        label: 'Select tokens',
      });
    }
  }, [fromChain, fromToken, toChain, toToken, _amountToBeTransferred, userAddress]);

  // Process initial props
  useEffect(() => {
    async function setSupportedChainAndToken(
      _supportedChains: SupportedChain[],
      direction: Direction,
      chainId: number,
      tokenAddress?: string,
    ): Promise<void> {
      const chain = _supportedChains.find((chain) => chain.chainId === chainId);
      if (direction === 'from') {
        setFromChain(chain);
      } else {
        setToChain(chain);
      }

      if (tokenAddress !== undefined && chain !== undefined) {
        const tokens = await getSupportedTokens(chainId);
        if (tokens !== undefined) {
          const token = tokens.find((token) => token.address === tokenAddress);
          if (direction === 'from') {
            setFromToken(token);
          } else {
            setToToken(token);
          }
        }
      }
    }
    if (supportedChains !== undefined && supportedChains.length > 0) {
      if (fromChainId !== undefined) {
        void setSupportedChainAndToken(supportedChains, 'from', fromChainId, fromTokenAddress);
      }
      if (toChainId !== undefined) {
        void setSupportedChainAndToken(supportedChains, 'to', toChainId, toTokenAddress);
      }
    }
  }, [supportedChains, fromChainId, toChainId, fromTokenAddress, toTokenAddress]);

  function handleChainSelect(direction: Direction, chain?: SupportedChain): void {
    if (chain !== undefined) {
      void getSupportedTokens(chain.chainId);
    }

    if (direction === 'from') {
      setFromChain(chain);
    } else {
      setToChain(chain);
    }
  }

  function handleTokenSelect(direction: Direction, token?: SupportedToken): void {
    // TODO: handle select logic
    if (direction === 'from') {
      setFromToken(token);
    } else {
      setToToken(token);
    }
  }

  return (
    <TransferContext.Provider value={transfer}>
      <TransferWidgetContainer
        fromChain={fromChain}
        fromToken={fromToken}
        toChain={toChain}
        toToken={toToken}
        handleChainSelect={handleChainSelect}
        handleTokenSelect={handleTokenSelect}
        amountToBeTransferred={_amountToBeTransferred}
        quoteResult={quoteResult}
        setAmountToBeTransferred={setAmountToBeTransferred}
        supportedChains={supportedChains}
        supportedTokensByChain={supportedTokensByChain}
        buttonState={buttonState}
        error={error}
        userAddress={userAddress}
        widgetView={widgetView}
        setWidgetView={setWidgetView}
      />
    </TransferContext.Provider>
  );
};
