import React, { type FunctionComponent, useEffect, type ReactNode, useState } from 'react';
import { TransferWidgetContainer } from './Widget/TransferWidgetContainer';
import { TransferContext } from '../context/TransferContext';
import {
  Transfer,
  type SupportedChain,
  type SupportedToken,
  type QuoteResult,
  type BridgeRequest,
} from '@argoplatform/transfer-sdk';
import { useTransfer } from '../hooks/useTransfer';
import { type ErrorType, type Direction, type WidgetState, type ReviewState } from 'models/const';
import { type WalletClient } from 'viem';

export interface TransferWidgetProps {
  fromChainId?: number;
  toChainId?: number;
  fromTokenAddress?: string;
  toTokenAddress?: string;
  amountToBeTransferred?: string;
  isTestnet?: boolean;
  userAddress?: string;
  walletClient?: WalletClient;
}

export const TransferWidget: FunctionComponent<TransferWidgetProps> = ({
  fromChainId,
  toChainId,
  fromTokenAddress,
  toTokenAddress,
  amountToBeTransferred,
  isTestnet,
  userAddress,
  walletClient,
}): ReactNode => {
  const transfer = new Transfer({
    isTestnet,
  });

  const [fromChain, setFromChain] = useState<SupportedChain | undefined>(undefined);
  const [toChain, setToChain] = useState<SupportedChain | undefined>(undefined);
  const [_amountToBeTransferred, setAmountToBeTransferred] = useState<string>(amountToBeTransferred ?? '');
  const [quoteResult, setQuoteResult] = useState<QuoteResult | undefined>(undefined);
  const { supportedChains, getSupportedTokens, supportedTokensByChain, calculateAmountToBeTransferred } = useTransfer({
    transfer,
  });
  const [fromToken, setFromToken] = useState<SupportedToken | undefined>(undefined);
  const [toToken, setToToken] = useState<SupportedToken | undefined>(undefined);
  const [widgetState, setWidgetState] = useState<WidgetState>({
    view: 'default',
    error: undefined,
    loading: false,
    buttonState: {
      type: 'disabled',
      label: 'Select tokens',
    },
  });
  const [reviewState, setReviewState] = useState<ReviewState | undefined>(undefined);

  function setLoadingState(): void {
    setWidgetState((prevState) => ({
      ...prevState,
      error: undefined,
      loading: true,
      buttonState: {
        type: 'loading',
        onClick: undefined,
        label: '',
      },
    }));
  }

  function setDefaultState(): void {
    setWidgetState((prevState) => ({
      view: 'default',
      error: undefined,
      loading: false,
      buttonState: {
        type: 'disabled',
        label: 'Select tokens',
        onClick: undefined,
      },
    }));
  }

  function setErrorState(error: ErrorType): void {
    setWidgetState((prevState) => ({
      ...prevState,
      error,
      loading: false,
      buttonState: {
        type: 'error',
        label: 'Error',
        onClick: undefined,
      },
    }));
  }

  function setReviewWidgetState(): void {
    setWidgetState({
      view: 'review',
      loading: false,
      error: undefined,
      buttonState: {
        type: 'default',
        label: 'Bridge',
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick: executeBridge,
      },
    });
  }

  async function executeBridge(): Promise<void> {
    if (walletClient === undefined) {
      setErrorState('no_user_wallet');
      return;
    }
    if (userAddress === undefined) {
      setErrorState('no_user_address');
      return;
    }

    if (
      fromChain !== undefined &&
      fromToken !== undefined &&
      toChain !== undefined &&
      toToken !== undefined &&
      _amountToBeTransferred !== undefined &&
      +_amountToBeTransferred > 0
    ) {
      setLoadingState();
      setReviewState({
        bridgeState: 'started',
      });

      try {
        const bridgeRequest = {
          srcChainId: fromChain.chainId,
          dstChainId: toChain.chainId,
          srcChainTokenAddress: fromToken.address,
          dstChainTokenAddress: toToken.address,
          qty: calculateAmountToBeTransferred(fromToken, _amountToBeTransferred),
          fromAddress: userAddress,
          toAddress: userAddress,
        };
        const bridgeResult = await transfer.bridge(bridgeRequest);
        if (bridgeResult !== undefined) {
          const hash = await transfer.executeBridge({
            route: bridgeResult?.bestRoute,
            walletClient,
          });
          setReviewState({
            txnHash: hash,
            bridgeState: 'done',
          });
          setWidgetState((prevState) => ({
            ...prevState,
            loading: false,
            error: undefined,
            buttonState: {
              type: 'default',
              label: 'Bridge Again',
              onClick: setDefaultState,
            },
          }));
        } else {
          throw new Error('retrieving_bridge_routes');
        }
      } catch (e: any) {
        console.error(e);
        setErrorState(e ?? 'execute_bridge');
      }
    }
  }

  async function quoteBridge(bridgeRequest: BridgeRequest): Promise<void> {
    setLoadingState();
    try {
      const result = await transfer.quoteBridge(bridgeRequest);
      if (Object.keys(result.bestRoute).length === 0) {
        setQuoteResult(undefined);
        setErrorState('no_bridge_routes');
      } else {
        setQuoteResult(result);
        setWidgetState((prevState) => ({
          ...prevState,
          loading: false,
          error: undefined,
          buttonState: {
            type: 'default',
            label: 'Review',
            onClick: setReviewWidgetState,
          },
        }));
      }
    } catch (error) {
      console.error(error);
      setErrorState('retrieving_bridge_routes');
    }
  }

  // Quote bridge
  useEffect(() => {
    if (widgetState.view !== 'default' || widgetState.loading) {
      return;
    }

    if (
      fromChain !== undefined &&
      fromToken !== undefined &&
      toChain !== undefined &&
      toToken !== undefined &&
      _amountToBeTransferred !== undefined &&
      +_amountToBeTransferred > 0
    ) {
      if (userAddress === undefined) {
        setQuoteResult(undefined);
        setErrorState('no_user_address');
        return;
      }
      // Ready to be bridged
      const bridgeRequest = {
        srcChainId: fromChain.chainId,
        dstChainId: toChain.chainId,
        srcChainTokenAddress: fromToken.address,
        dstChainTokenAddress: toToken.address,
        qty: calculateAmountToBeTransferred(fromToken, _amountToBeTransferred),
        fromAddress: userAddress,
        toAddress: userAddress,
      };
      void quoteBridge(bridgeRequest);
    } else {
      setWidgetState((prevState) => ({
        ...prevState,
        loading: false,
        error: undefined,
        buttonState: {
          onClick: undefined,
          type: 'disabled',
          label: 'Select tokens',
        },
      }));
    }
  }, [fromChain, fromToken, toChain, toToken, _amountToBeTransferred, userAddress, widgetState.view]);

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
        userAddress={userAddress}
        widgetState={widgetState}
        setWidgetState={setWidgetState}
        reviewState={reviewState}
      />
    </TransferContext.Provider>
  );
};
