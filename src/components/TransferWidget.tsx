import React, { type FunctionComponent, useEffect, type ReactNode, useState } from 'react';
import { TransferWidgetContainer } from './widget/TransferWidgetContainer';
import { TransferConext } from '../context/TransferContext';
import { Transfer, type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { useTransfer } from '../hooks/useTransfer';
import { type RoutesProps } from './routes/RouteList';
import { type Direction } from 'models/const';
import { type ErrorMessageProps } from './errors/ErrorMessage';

export interface TransferWidgetProps {
  fromChainId?: number;
  toChainId?: number;
  fromTokenAddress?: string;
  toTokenAddress?: string;
  amountToBeTransferred?: string;

  // TODO: Remove
  routes: RoutesProps;
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
  routes,
}): ReactNode => {
  const [fromChain, setFromChain] = useState<SupportedChain | undefined>(undefined);
  const [fromToken, setFromToken] = useState<SupportedToken | undefined>(undefined);
  const [toChain, setToChain] = useState<SupportedChain | undefined>(undefined);
  const [toToken, setToToken] = useState<SupportedToken | undefined>(undefined);
  const { supportedChains, getSupportedTokens } = useTransfer({ transfer });
  // const [error, setError] = useState<ErrorMessageProps | undefined>(undefined);

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
          // TODO: Handle error
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
      } else if (toChainId !== undefined) {
        void setSupportedChainAndToken(supportedChains, 'from', toChainId, fromTokenAddress);
      }
    }
  }, [supportedChains, fromChainId, toChainId, fromTokenAddress, toTokenAddress]);

  function handleChainSelect(direction: Direction, chain: SupportedChain): void {
    // TODO: handle select logic
    if (direction === 'from') {
      setFromChain(chain);
    } else {
      setToChain(chain);
    }
  }

  function handleTokenSelect(direction: Direction, token: SupportedToken): void {
    // TODO: handle select logic
    if (direction === 'from') {
      setFromToken(token);
    } else {
      setToToken(token);
    }
  }

  return (
    <TransferConext.Provider value={transfer}>
      <TransferWidgetContainer
        fromChain={fromChain}
        fromToken={fromToken}
        toChain={toChain}
        toToken={toToken}
        handleChainSelect={handleChainSelect}
        handleTokenSelect={handleTokenSelect}
        amountToBeTransferred={amountToBeTransferred}
        routes={routes}
        supportedChains={supportedChains}
        buttonState={{ type: 'default', label: 'Transfer' }}
      />
    </TransferConext.Provider>
  );
};
