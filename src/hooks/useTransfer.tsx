import React from 'react';
import { type Transfer, type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { type SupportedTokensByChain } from '../models/const';

interface UseTransferArgs {
  transfer: Transfer;
}

interface UseTransferReturn {
  supportedChains: SupportedChain[] | undefined;
  supportedTokensByChain: SupportedTokensByChain | undefined;
  getSupportedTokens: (chainId: number) => Promise<SupportedToken[] | undefined>;
}

export function useTransfer(props?: UseTransferArgs): UseTransferReturn {
  const [supportedChains, setSupportedChains] = React.useState<SupportedChain[] | undefined>(undefined);
  const [supportedTokensByChain, setSupportedTokensByChain] = React.useState<SupportedTokensByChain | undefined>(
    undefined,
  );

  React.useEffect(() => {
    async function _setSupportedChains(transfer: Transfer): Promise<void> {
      try {
        const chains = await transfer.get_supported_chains();
        setSupportedChains(chains);
      } catch (e) {
        console.error(e);
        setSupportedChains([]);
      }
    }

    if (supportedChains === undefined && props !== undefined) {
      void _setSupportedChains(props.transfer);
    }
  }, []);

  async function getSupportedTokens(chainId: number): Promise<SupportedToken[] | undefined> {
    if (props === undefined) {
      return undefined;
    }
    if (supportedTokensByChain?.[chainId] !== undefined) {
      return supportedTokensByChain[chainId];
    }
    try {
      const tokens = await props.transfer.get_supported_tokens(chainId);
      setSupportedTokensByChain((prev) => {
        return {
          ...prev,
          [chainId]: tokens,
        };
      });
      return tokens;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  return {
    supportedChains,
    getSupportedTokens,
    supportedTokensByChain,
  };
}
