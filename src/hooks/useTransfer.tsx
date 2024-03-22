import React from 'react';
import {
  type Transfer,
  type SupportedChain,
  type SupportedToken,
  type Portfolio,
  type PortfolioToken,
  type PortfolioChain,
} from '@argoplatform/transfer-sdk';
import { type SupportedTokensByChain } from '../models/const';

interface UseTransferArgs {
  transfer: Transfer;
  userAddress?: string;
}

export type PortfolioMap = Record<number, Record<string, PortfolioToken>>;

interface UseTransferReturn {
  supportedChains: SupportedChain[] | undefined;
  supportedTokensByChain: SupportedTokensByChain | undefined;
  getSupportedTokens: (chainId: number) => Promise<SupportedToken[] | undefined>;
  portfolioMap: PortfolioMap | undefined;
}

export function useTransfer(props?: UseTransferArgs): UseTransferReturn {
  const [supportedChains, setSupportedChains] = React.useState<SupportedChain[] | undefined>(undefined);
  const [supportedTokensByChain, setSupportedTokensByChain] = React.useState<SupportedTokensByChain | undefined>(
    undefined,
  );
  const [portfolioMap, setPortfolioMap] = React.useState<PortfolioMap | undefined>(undefined);

  React.useEffect(() => {
    async function _setSupportedChains(transfer: Transfer): Promise<void> {
      try {
        const chains = await transfer.getSupportedChains();
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

  React.useEffect(() => {
    async function _setPortfolio(transfer: Transfer, userAddress: string): Promise<void> {
      try {
        const portfolio: Portfolio = await transfer.getPortfolio(userAddress);
        const _portfolioMap: PortfolioMap = {};
        for (let i = 0; i < portfolio.chains.length; i++) {
          const chain: PortfolioChain = portfolio.chains[i];
          for (let j = 0; j < chain.tokens.length; j++) {
            const token = chain.tokens[j];
            if (_portfolioMap[chain.chainId] === undefined) {
              _portfolioMap[chain.chainId] = {};
            }
            _portfolioMap[chain.chainId][token.address] = token;
          }
        }
        setPortfolioMap(_portfolioMap);
      } catch (e) {
        setPortfolioMap(undefined);
      }
    }

    if (portfolioMap === undefined && props?.userAddress !== undefined) {
      void _setPortfolio(props.transfer, props.userAddress);
    }
  }, [props?.userAddress]);

  async function getSupportedTokens(chainId: number): Promise<SupportedToken[] | undefined> {
    if (props === undefined) {
      return undefined;
    }
    if (supportedTokensByChain?.[chainId] !== undefined) {
      return supportedTokensByChain[chainId];
    }
    try {
      const tokens = await props.transfer.getSupportedTokens(chainId);
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
    portfolioMap,
  };
}
