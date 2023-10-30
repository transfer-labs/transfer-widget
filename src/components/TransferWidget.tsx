import React, { type FunctionComponent, useEffect, type ReactNode, useState } from 'react';
import { TransferWidgetContainer } from './widget/TransferWidgetContainer';
import { TransferConext } from '../context/TransferContext';
import { Transfer, type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { useTransfer } from '../hooks/useTransfer';
import { type Direction } from 'models/const';
import { type ErrorMessageProps } from './errors/ErrorMessage';
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
  const [fromToken, setFromToken] = useState<SupportedToken | undefined>(undefined);
  const [toChain, setToChain] = useState<SupportedChain | undefined>(undefined);
  const [toToken, setToToken] = useState<SupportedToken | undefined>(undefined);
  const [_amountToBeTransferred, setAmountToBeTransferred] = useState<string | undefined>(amountToBeTransferred);
  const { supportedChains, getSupportedTokens } = useTransfer({ transfer });
  const [error, setError] = useState<ErrorMessageProps | undefined>(undefined);
  const [buttonState, setButtonState] = useState<ActionButtonProps>({
    type: 'disabled',
    label: 'Select tokens',
  });

  function handleBridgeQuote(): void {
    if (
      fromChain !== undefined &&
      fromToken !== undefined &&
      toChain !== undefined &&
      toToken !== undefined &&
      _amountToBeTransferred !== undefined &&
      +_amountToBeTransferred > 0
    ) {
      const quoteBody = {
        srcChainId: fromChain.chainId,
        dstChainId: toChain.chainId,
        srcChainTokenAddress: fromToken.address,
        dstChainTokenAddress: toToken.address,
        qty: +_amountToBeTransferred,
        fromAddress: '0x000000', // TODO: get from address
        toAddress: '0x000000', // TODO: get to address
      };
      console.log(quoteBody);

      // void transfer
      //   .quoteBridge(quoteBody)
      //   .then((result) => {
      //     console.log(result);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     setError({
      //       label: error.message,
      //     });
      //   });
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
        onClick: handleBridgeQuote,
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
    <TransferConext.Provider value={transfer}>
      <TransferWidgetContainer
        fromChain={fromChain}
        fromToken={fromToken}
        toChain={toChain}
        toToken={toToken}
        handleChainSelect={handleChainSelect}
        handleTokenSelect={handleTokenSelect}
        amountToBeTransferred={_amountToBeTransferred}
        setAmountToBeTransferred={setAmountToBeTransferred}
        supportedChains={supportedChains}
        buttonState={buttonState}
        error={error}
      />
    </TransferConext.Provider>
  );
};
