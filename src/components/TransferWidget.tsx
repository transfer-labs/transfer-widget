import React, { type FunctionComponent, useEffect, type ReactNode, useState } from 'react';
import { TransferWidgetContainer } from './TransferWidgetContainer';
import { TransferConext } from '../context/TransferContext';
import { Transfer, type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { useTransfer } from '../hooks/useTransfer';
import { type RoutesProps } from './Routes/RouteList';
import { type GasErrorProps } from './Errors/GasError';
export interface TransferWidgetProps {
  fromChainId?: number;
  toChainId?: number;
  fromTokenAddress?: string;
  toTokenAddress?: string;
  amountToBeTransferred?: string;

  // TODO: Remove
  gasErrorProps: GasErrorProps;
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
  gasErrorProps,
  routes,
}): ReactNode => {
  const [fromChain, setFromChain] = useState<SupportedChain | undefined>(undefined);
  const [fromToken, setFromToken] = useState<SupportedToken | undefined>(undefined);
  const [toChain, setToChain] = useState<SupportedChain | undefined>(undefined);
  const [toToken, setToToken] = useState<SupportedToken | undefined>(undefined);
  const { supportedChains, getSupportedTokens } = useTransfer({ transfer });

  // Process props
  useEffect(() => {
    async function setSupportedChainAndToken(
      _supportedChains: SupportedChain[],
      direction: 'from' | 'to',
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

  return (
    <TransferConext.Provider value={transfer}>
      <TransferWidgetContainer
        fromChain={fromChain}
        fromToken={fromToken}
        toChain={toChain}
        toToken={toToken}
        amountToBeTransferred={amountToBeTransferred}
        gasErrorProps={gasErrorProps}
        routes={routes}
        supportedChains={supportedChains}
      />
    </TransferConext.Provider>
  );
};
