import React, { type FunctionComponent, useEffect, type ReactNode, useState } from 'react';
import { TransferWidgetContainer } from './Widget/TransferWidgetContainer';
import { TransferContext } from '../context/TransferContext';
import { Transfer, type SupportedChain, type SupportedToken, type Route } from '@argoplatform/transfer-sdk';
import { useTransfer } from '../hooks/useTransfer';
import { type ErrorType, type Direction } from 'models/const';
import { type ActionButtonProps } from './ActionButton';

export interface TransferWidgetProps {
  fromChainId?: number;
  toChainId?: number;
  fromTokenAddress?: string;
  toTokenAddress?: string;
  amountToBeTransferred?: string;
}

const transfer = new Transfer({
  apiKey: 'XXX',
});

export const TransferWidget: FunctionComponent<TransferWidgetProps> = ({
  fromChainId,
  toChainId,
  fromTokenAddress,
  toTokenAddress,
  amountToBeTransferred,
}): ReactNode => {
  const [fromChain, setFromChain] = useState<SupportedChain | undefined>(undefined);
  const [toChain, setToChain] = useState<SupportedChain | undefined>(undefined);
  const [_amountToBeTransferred, setAmountToBeTransferred] = useState<string | undefined>(amountToBeTransferred);
  const { supportedChains, getSupportedTokens } = useTransfer({ transfer });
  const [error, setError] = useState<ErrorType | undefined>(undefined);
  const [fromToken, setFromToken] = useState<SupportedToken | undefined>(undefined);
  const [toToken, setToToken] = useState<SupportedToken | undefined>(undefined);
  const [routes, setRoutes] = useState<Route[] | undefined>(undefined);
  const [buttonState, setButtonState] = useState<ActionButtonProps>({
    type: 'disabled',
    label: 'Select tokens',
  });

  function handleBridge(): void {
    if (
      fromChain !== undefined &&
      fromToken !== undefined &&
      toChain !== undefined &&
      toToken !== undefined &&
      _amountToBeTransferred !== undefined &&
      +_amountToBeTransferred > 0
    ) {
      const bridgeBody = {
        srcChainId: fromChain.chainId,
        dstChainId: toChain.chainId,
        srcChainTokenAddress: fromToken.address,
        dstChainTokenAddress: toToken.address,
        qty: +_amountToBeTransferred,
        fromAddress: '0x000000', // TODO: get from address
        toAddress: '0x000000', // TODO: get to address
      };
      console.log(bridgeBody);

      void transfer
        .bridge(bridgeBody)
        .then((result) => {
          setRoutes([result.bestRoute, ...result.alternateRoutes]);
        })
        .catch((error) => {
          console.error(error);
          setError('retrieving_bridge_routes');
        });
    }
  }

  useEffect(() => {
    if (
      fromChain !== undefined &&
      fromToken !== undefined &&
      toChain !== undefined &&
      toToken !== undefined &&
      _amountToBeTransferred !== undefined &&
      +_amountToBeTransferred > 0
    ) {
      setButtonState({
        type: 'default',
        label: 'Transfer',
        onClick: handleBridge,
      });
    } else {
      setButtonState({
        type: 'disabled',
        label: 'Select tokens',
      });
    }
  }, [fromChain, fromToken, toChain, toToken, _amountToBeTransferred]);

  // Process props
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
    // TODO: handle select logic
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
        routes={routes}
        handleChainSelect={handleChainSelect}
        handleTokenSelect={handleTokenSelect}
        amountToBeTransferred={_amountToBeTransferred}
        setAmountToBeTransferred={setAmountToBeTransferred}
        supportedChains={supportedChains}
        buttonState={buttonState}
        error={error}
      />
    </TransferContext.Provider>
  );
};
