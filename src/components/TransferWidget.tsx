import React, { type FunctionComponent, useEffect, type ReactNode, useState } from 'react';
import { TransferWidgetContainer } from './Widget/TransferWidgetContainer';
import { TransferContext } from '../context/TransferContext';
import { Transfer, type SupportedChain, type SupportedToken, type BridgeResult } from '@argoplatform/transfer-sdk';
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
  const [_amountToBeTransferred, setAmountToBeTransferred] = useState<string>(amountToBeTransferred ?? '');
  const [estimateTransferValue, setEstimateTransferValue] = useState<string>('');
  const { supportedChains, getSupportedTokens, supportedTokens } = useTransfer({ transfer });
  const [error, setError] = useState<ErrorType | undefined>(undefined);
  const [fromToken, setFromToken] = useState<SupportedToken | undefined>(undefined);
  const [toToken, setToToken] = useState<SupportedToken | undefined>(undefined);
  const [bridgeResult, setBridgeResult] = useState<BridgeResult | undefined>(undefined);
  const [buttonState, setButtonState] = useState<ActionButtonProps>({
    type: 'disabled',
    label: 'Select tokens',
  });

  function handleBridge(): void {
    console.log('HEREE');
    if (
      fromChain !== undefined &&
      fromToken !== undefined &&
      toChain !== undefined &&
      toToken !== undefined &&
      _amountToBeTransferred !== undefined &&
      +_amountToBeTransferred > 0 &&
      error === undefined
    ) {
      const bridgeBody = {
        srcChainId: fromChain.chainId,
        dstChainId: toChain.chainId,
        srcChainTokenAddress: fromToken.address,
        dstChainTokenAddress: toToken.address,
        qty: +_amountToBeTransferred,
        fromAddress: '0x968961A3A78bCeb7F91323054eCB332b19887fBf', // TODO: get from address
        toAddress: '0x968961A3A78bCeb7F91323054eCB332b19887fBf', // TODO: get to address
      };
      console.log(bridgeBody);

      void transfer
        .bridge(bridgeBody)
        .then((result) => {
          setBridgeResult(result);
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
      // Ready to be bridged\
      const bridgeBody = {
        srcChainId: fromChain.chainId,
        dstChainId: toChain.chainId,
        srcChainTokenAddress: fromToken.address,
        dstChainTokenAddress: toToken.address,
        qty: +_amountToBeTransferred,
        fromAddress: '0x968961A3A78bCeb7F91323054eCB332b19887fBf', // TODO: get from address
        toAddress: '0x968961A3A78bCeb7F91323054eCB332b19887fBf', // TODO: get to address
      };

      void transfer
        .quoteBridge(bridgeBody)
        .then((result) => {
          setEstimateTransferValue(result.bestRoute.dstAmountEstimate.toString());
          setButtonState({
            type: 'default',
            label: 'Transfer',
            onClick: handleBridge,
          });
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
  }, [fromChain, fromToken, toChain, toToken, _amountToBeTransferred]);

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
        console.log(tokens);
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
      void getSupportedTokens(chain?.chainId); // TODO: cache?
    }

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
        bridgeResult={bridgeResult}
        handleChainSelect={handleChainSelect}
        handleTokenSelect={handleTokenSelect}
        amountToBeTransferred={_amountToBeTransferred}
        estimateTransferValue={estimateTransferValue}
        setAmountToBeTransferred={setAmountToBeTransferred}
        supportedChains={supportedChains}
        supportedTokens={supportedTokens}
        buttonState={buttonState}
        error={error}
      />
    </TransferContext.Provider>
  );
};
