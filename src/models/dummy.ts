import { type SupportedToken, type SupportedChain } from '@argoplatform/transfer-sdk';

export const SupportedChains: SupportedChain[] = [
  {
    name: 'ethereum',
    logoURI: '',
    isTestnet: false,
    chainId: 1,
    blockExplorer: 'https://etherscan.io/',
  },
  {
    name: 'polygon',
    logoURI: '',
    isTestnet: false,
    chainId: 137,
    blockExplorer: 'https://polygonscan.com/',
  },
];

export const SupportedTokens: SupportedToken[] = [
  {
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
    chainId: 1,
    logoUri: '',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    chainId: 1,
    logoUri: '',
    address: '',
  },
];
