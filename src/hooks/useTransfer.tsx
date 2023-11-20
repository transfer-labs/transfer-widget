import { useState, useEffect } from 'react';
import { type Transfer, type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { type SupportedTokensByChain } from '../models/const';
interface Props {
  transfer: Transfer;
}

interface UseTransfer {
  supportedChains: SupportedChain[] | undefined;
  supportedTokensByChain: SupportedTokensByChain | undefined;
  getSupportedTokens: (chainId: number) => Promise<SupportedToken[] | undefined>;
}

export function useTransfer({ transfer }: Props): UseTransfer {
  const [supportedChains, setSupportedChains] = useState<SupportedChain[] | undefined>(undefined);
  const [supportedTokensByChain, setSupportedTokensByChain] = useState<SupportedTokensByChain | undefined>(undefined);

  useEffect(() => {
    async function _setSupportedChains(): Promise<void> {
      try {
        const chains = await transfer.getSupportedChains();
        setSupportedChains(chains);
      } catch (e) {
        console.error(e);
        setSupportedChains([]);
      }
    }

    if (supportedChains === undefined) {
      void _setSupportedChains();
    }
  }, []);

  async function getSupportedTokens(chainId: number): Promise<SupportedToken[] | undefined> {
    if (supportedTokensByChain?.[chainId] !== undefined) {
      return supportedTokensByChain[chainId];
    }
    try {
      const tokens = await transfer.getSupportedTokens(chainId);
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
