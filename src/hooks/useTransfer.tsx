import { useState, useEffect } from 'react';
import { type Transfer, type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';

interface Props {
  transfer: Transfer;
}

interface UseTransfer {
  supportedChains: SupportedChain[] | undefined;
  getSupportedTokens: (chainId: number) => Promise<SupportedToken[] | undefined>;
}

export function useTransfer({ transfer }: Props): UseTransfer {
  const [supportedChains, setSupportedChains] = useState<SupportedChain[] | undefined>(undefined);

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
    try {
      const tokens = await transfer.getSupportedTokens(chainId);
      return tokens;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  return {
    supportedChains,
    getSupportedTokens,
  };
}
