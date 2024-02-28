import '../index.css';
import React, { type FunctionComponent, useEffect, type ReactNode, useState, useRef } from 'react';
import { TransferWidgetContainer } from './Widget/TransferWidgetContainer';
import { TransferContext } from '../context/TransferContext';
import {
  Transfer,
  type SupportedChain,
  type SupportedToken,
  type QuoteBridgeResult,
  type BridgeRequest,
  type QuoteBridgeRoute,
  type QuoteSwapResult,
  type QuoteSwapRoute,
  type SwapRequest,
} from '@argoplatform/transfer-sdk';
import { useTransfer } from '../hooks/useTransfer';
import {
  type ErrorType,
  type Direction,
  type WidgetState,
  type ReviewState,
  Error as ErrorBody,
  type Settings,
  type WidgetTheme,
} from '../models/const';
import { TransferAbstraction, type QuoteResult, type QuoteRoute } from '../models/transfer';
import { type WalletClient } from 'viem';
import { findRouteFromSelected } from '../utils/routes';
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
  fromChain?: SupportedChain;
  toChain?: SupportedChain;
  fromToken?: SupportedToken;
  toToken?: SupportedToken;
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
    is_testnet: isTestnet,
  });

  const [fromChain, setFromChain] = useState<SupportedChain | undefined>(undefined);
  const [toChain, setToChain] = useState<SupportedChain | undefined>(undefined);
  const [_amountToBeTransferred, setAmountToBeTransferred] = useState<string>(amountToBeTransferred ?? '');

  const [transferState, setTransferState] = useState<TransferAbstraction>(new TransferAbstraction());

  // const [quoteBridgeResult, setQuotBridgeeResult] = useState<QuoteBridgeResult | undefined>(undefined);
  // const [selectedBridgeRoute, setSelectedBridgeRoute] = useState<QuoteBridgeRoute | undefined>(undefined);
  // const [quoteSwapResult, setQuoteSwapResult] = useState<QuoteSwapResult | undefined>(undefined);
  // const [selectedSwapRoute, setSelectedSwapRoute] = useState<QuoteSwapRoute | undefined>(undefined);

  const { supportedChains, getSupportedTokens, supportedTokensByChain } = useTransfer({
    transfer,
  });
  const { toTokenDecimals } = useTokenUtils();
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

  // const selectedRouteRef = useRef(selectedRoute);
  // useEffect(() => {
  //   selectedRouteRef.current = selectedRoute;
  // }, [selectedRoute]);

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
      bridgeState: 'notStarted',
      txnHash: undefined,
    });
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
    console.log('EXECUTE');
    // if (walletClient === undefined) {
    //   setErrorState('no_user_wallet');
    //   return;
    // }
    // if (userAddress === undefined) {
    //   setErrorState('no_user_address');
    //   return;
    // }
    // const _selectedRoute = selectedRouteRef.current;
    // if (_selectedRoute === undefined) {
    //   setErrorState('no_route_selected');
    //   return;
    // }

    // if (
    //   fromChain !== undefined &&
    //   fromToken !== undefined &&
    //   toChain !== undefined &&
    //   toToken !== undefined &&
    //   _amountToBeTransferred !== undefined &&
    //   +_amountToBeTransferred > 0
    // ) {
    //   setLoadingState();
    //   setReviewState({
    //     bridgeState: 'started',
    //   });

    //   try {
    //     const bridgeRequest: BridgeRequest = {
    //       src_chain_id: fromChain.chain_id,
    //       dst_chain_id: toChain.chain_id,
    //       src_chain_token_address: fromToken.address,
    //       dst_chain_token_address: toToken.address,
    //       qty: toTokenDecimals(fromToken.decimals, _amountToBeTransferred),
    //       from_address: userAddress,
    //       to_address: userAddress,
    //       slippage: settings.slippage,
    //     };
    //     const bridgeResult = await transfer.bridge(bridgeRequest);
    //     if (bridgeResult !== undefined) {
    //       const route = findRouteFromSelected(_selectedRoute, bridgeResult.best_route, bridgeResult.alternate_routes);
    //       if (route === undefined) {
    //         throw new Error('no_routes');
    //       }
    //       const txnReceipt = await transfer.execute_bridge({
    //         route: bridgeResult?.best_route,
    //         wallet_client: walletClient,
    //       });
    //       if (txnReceipt.status === 'reverted') {
    //         throw new Error('execute_bridge');
    //       }

    //       setReviewState({
    //         txnHash: txnReceipt.transactionHash,
    //         bridgeState: 'done',
    //       });
    //       setWidgetState((prevState) => ({
    //         ...prevState,
    //         loading: false,
    //         error: undefined,
    //         buttonState: {
    //           type: 'default',
    //           label: 'Bridge Again',
    //           onClick: setDefaultState,
    //         },
    //       }));
    //     } else {
    //       throw new Error('retrieving_routes');
    //     }
    //   } catch (e: any) {
    //     console.error(e);
    //     setReviewState({
    //       bridgeState: 'notStarted',
    //     });
    //     if (typeof e === 'string' && e in ErrorBody) {
    //       setErrorState(e as ErrorType);
    //     } else {
    //       setErrorState('execute_bridge');
    //     }
    //   }
    // }
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

  async function handleQuote(args: HandleQuoteArgs): Promise<void> {
    if (
      args.fromChain === undefined ||
      args.toChain === undefined ||
      args.fromToken === undefined ||
      args.toToken === undefined
    ) {
      return;
    }
    setLoadingState();
    try {
      let quoteResult: QuoteResult;
      if (args.fromChain.chain_id === args.toChain.chain_id) {
        const swapRequest: SwapRequest = {
          chain_id: args.fromChain.chain_id,
          token_in_address: args.fromToken.address,
          token_out_address: args.toToken.address,
          qty: toTokenDecimals(args.fromToken.decimals, args.amount),
          from_address: args.fromAddress,
          slippage: settings.slippage,
        };
        quoteResult = await transfer.quote_swap(swapRequest);
      } else {
        const bridgeRequest: BridgeRequest = {
          src_chain_id: args.fromChain.chain_id,
          dst_chain_id: args.toChain.chain_id,
          src_chain_token_address: args.fromToken.address,
          dst_chain_token_address: args.toToken.address,
          qty: toTokenDecimals(args.fromToken.decimals, args.amount),
          from_address: args.fromAddress,
          to_address: args.toAddress,
          slippage: settings.slippage,
        };
        quoteResult = await transfer.quote_bridge(bridgeRequest);
      }

      if (Object.keys(quoteResult.best_route).length === 0) {
        transferState.setQuoteResult(quoteResult);
        setTransferState(transferState);
        setErrorState('no_routes');
      } else {
        transferState.setQuoteResult(quoteResult);
        transferState.setSelectedQuoteRoute(quoteResult.best_route);
        setTransferState(transferState);
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
      transferState.reset();
      setTransferState(transferState);
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
      transferState.reset();
      setTransferState(transferState);
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
          transferState.reset();
          setTransferState(transferState);
          setErrorState('no_user_address');
        } else {
          void handleQuote({
            fromChain,
            toChain,
            fromToken,
            toToken,
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
      const chain = _supportedChains.find((chain) => chain.chain_id === chainId);
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
  }, [supportedChains, fromChainId, toChainId, fromTokenAddress, toTokenAddress]);

  function handleChainSelect(direction: Direction, chain?: SupportedChain): void {
    if (chain !== undefined) {
      void getSupportedTokens(chain.chain_id);
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

  function handleSelectRoute(route: QuoteRoute): void {
    if (route !== undefined) {
      transferState.setSelectedQuoteRoute(route);
      setTransferState(transferState);
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
          transferState={transferState}
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
        />
      </WidgetContainer>
    </TransferContext.Provider>
  );
};
