import '../index.css';
import React, { type FunctionComponent, useEffect, type ReactNode, useState, useRef } from 'react';
import { TransferWidgetContainer } from './Widget/TransferWidgetContainer';
import { TransferContext } from '../context/TransferContext';
import {
  Transfer,
  type SupportedChain,
  type SupportedToken,
  type QuoteRouteResponse,
  type QuoteRoute,
} from '@argoplatform/transfer-sdk';
import { useTransfer } from '../hooks/useTransfer';
import { useRoutes } from '../hooks/useRoutes';
import {
  type ErrorType,
  type Direction,
  type WidgetState,
  type ReviewState,
  Error as ErrorBody,
  type Settings,
  type WidgetTheme,
} from '../models/const';
import { type WalletClient } from 'viem';
import { WidgetContainer } from './Widget/WidgetContainer';
import { useTokenUtils } from '../hooks/useTokenUtils';

export interface TransferWidgetProps {
  fromChainId?: number;
  toChainId?: number;
  fromTokenAddress?: string;
  toTokenAddress?: string;
  amountToBeTransferred?: string;
  isTestnet?: boolean;
  userAddress?: string;
  walletClient?: WalletClient;
  onSuccess?: () => void;
  theme?: WidgetTheme;
  autoSize?: boolean;
}

export interface HandleQuoteArgs {
  fromChain: SupportedChain;
  toChain: SupportedChain;
  fromToken: SupportedToken;
  toToken: SupportedToken;
  amount: string;
  slippage: number;
  fromAddress: string;
  toAddress: string;
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
  theme = 'default',
  autoSize = false,
}): ReactNode => {
  const transfer = new Transfer({
    is_testnet: isTestnet ?? false,
  });

  const [fromChain, setFromChain] = useState<SupportedChain | undefined>(undefined);
  const [toChain, setToChain] = useState<SupportedChain | undefined>(undefined);
  const [_amountToBeTransferred, setAmountToBeTransferred] = useState<string>(amountToBeTransferred ?? '');
  const [quoteResult, setQuoteResult] = useState<QuoteRouteResponse | undefined>(undefined);
  const [selectedQuoteRoute, setSelectedQuoteRoute] = useState<QuoteRoute | undefined>(undefined);
  const { supportedChains, getSupportedTokens, supportedTokensByChain, portfolioMap } = useTransfer({
    userAddress,
    transfer,
  });
  const { toTokenDecimals } = useTokenUtils();
  const { findRoute } = useRoutes();
  const [fromToken, setFromToken] = useState<SupportedToken | undefined>(undefined);
  const [toToken, setToToken] = useState<SupportedToken | undefined>(undefined);
  const [settings, setSettings] = useState<Settings>({
    slippage: 0.01,
  });
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

  const selectedRouteRef = useRef(selectedQuoteRoute);
  useEffect(() => {
    selectedRouteRef.current = selectedQuoteRoute;
  }, [selectedQuoteRoute]);

  function setLoadingState(): void {
    if (!widgetState.loading) {
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
    setReviewState({
      state: 'notStarted',
      txnHash: undefined,
    });
    setWidgetState({
      view: 'review',
      loading: false,
      error: undefined,
      buttonState: {
        type: 'default',
        label: 'Transfer',
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick: executeRoute,
      },
    });
  }

  async function executeRoute(): Promise<void> {
    if (walletClient === undefined) {
      setErrorState('no_user_wallet');
      return;
    }
    if (userAddress === undefined) {
      setErrorState('no_user_address');
      return;
    }
    const _selectedRoute = selectedRouteRef.current;
    if (_selectedRoute === undefined) {
      setErrorState('no_route_selected');
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
        state: 'started',
      });

      try {
        const routes = await transfer.getRoutes({
          fromChainId: fromChain.chainId,
          toChainId: toChain.chainId,
          fromTokenAddress: fromToken.address,
          toTokenAddress: toToken.address,
          fromUserAddress: userAddress,
          toUserAddress: userAddress,
          amount: toTokenDecimals(fromToken.decimals, _amountToBeTransferred),
          slippage: settings.slippage,
        });

        if (routes !== undefined) {
          const route = findRoute(_selectedRoute, routes);
          if (route === undefined) {
            throw new Error(ErrorBody.no_routes.key);
          }

          const txnReceipt = await transfer.execute({
            route,
            walletClient,
          });

          if (txnReceipt.status === 'reverted') {
            throw new Error(ErrorBody.execute.key);
          }

          setReviewState({
            txnHash: txnReceipt.transactionHash,
            state: 'done',
          });
          setWidgetState((prevState) => ({
            ...prevState,
            loading: false,
            error: undefined,
            buttonState: {
              type: 'default',
              label: 'Transfer another',
              onClick: setDefaultState,
            },
          }));
        } else {
          throw new Error(ErrorBody.retrieving_routes.key);
        }
      } catch (e: any) {
        console.error(e);
        setReviewState({
          state: 'notStarted',
        });
        if (e.message in ErrorBody) {
          setErrorState(e.message as ErrorType);
        } else {
          setErrorState('execute');
        }
      }
    }
  }

  function canQuote(): boolean {
    return (
      fromChain !== undefined &&
      fromToken !== undefined &&
      toChain !== undefined &&
      toToken !== undefined &&
      _amountToBeTransferred !== undefined &&
      +_amountToBeTransferred > 0
    );
  }

  function reset(): void {
    setSelectedQuoteRoute(undefined);
    setQuoteResult(undefined);
  }

  async function handleQuote(args: HandleQuoteArgs): Promise<void> {
    setLoadingState();
    try {
      const quoteRoutes = await transfer.getQuoteRoutes({
        fromChainId: args.fromChain.chainId,
        toChainId: args.toChain.chainId,
        fromTokenAddress: args.fromToken.address,
        toTokenAddress: args.toToken.address,
        fromUserAddress: args.fromAddress,
        toUserAddress: args.toAddress,
        slippage: settings.slippage,
        amount: toTokenDecimals(args.fromToken.decimals, args.amount),
      });

      if (Object.keys(quoteRoutes.bestRoute).length === 0) {
        reset();
        setErrorState('no_routes');
      } else {
        setQuoteResult(quoteRoutes);
        setSelectedQuoteRoute(quoteRoutes.bestRoute);
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
    } catch (e: any) {
      console.error(e);
      reset();
      setErrorState('retrieving_routes');
    }
  }

  // Quote
  useEffect(() => {
    if (widgetState.view !== 'default') {
      return;
    }

    if (canQuote()) {
      setLoadingState();
    } else {
      reset();
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

    const debounce = setTimeout(() => {
      if (canQuote()) {
        if (userAddress === undefined) {
          reset();
          setErrorState('no_user_address');
        } else {
          void handleQuote({
            fromChain: fromChain as SupportedChain,
            toChain: toChain as SupportedChain,
            fromToken: fromToken as SupportedToken,
            toToken: toToken as SupportedToken,
            amount: _amountToBeTransferred,
            slippage: settings.slippage,
            fromAddress: userAddress,
            toAddress: userAddress,
          });
        }
      }
    }, 700);

    return () => {
      clearTimeout(debounce);
    };
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
        const lowerCaseTokenAddress = tokenAddress.toLowerCase();
        if (tokens !== undefined) {
          const token = tokens.find((token) => token.address.toLowerCase() === lowerCaseTokenAddress);
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
  }, [supportedChains, fromChainId, toChainId, fromTokenAddress, toTokenAddress, portfolioMap]);

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
    if (direction === 'from') {
      setFromToken(token);
    } else {
      setToToken(token);
    }
  }

  function handleSelectRoute(route?: QuoteRoute): void {
    if (route !== undefined) {
      setSelectedQuoteRoute(route);
    }
  }

  return (
    <TransferContext.Provider value={transfer}>
      <WidgetContainer autoSize={autoSize} theme={theme}>
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
          setSelectedRoute={handleSelectRoute}
          setSettings={setSettings}
          settings={settings}
          autoSize={autoSize}
          theme={theme}
          selectedRoute={selectedQuoteRoute}
          portfolioMap={portfolioMap}
        />
      </WidgetContainer>
    </TransferContext.Provider>
  );
};
