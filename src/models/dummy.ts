import { type SupportedToken, type SupportedChain } from '@argoplatform/transfer-sdk';

export const SupportedChains: SupportedChain[] = [
  {
    name: 'ethereum',
    logo_uri: '',
    is_testnet: false,
    chain_id: 1,
    block_explorer: 'https://etherscan.io/',
  },
  {
    name: 'polygon',
    logo_uri: '',
    is_testnet: false,
    chain_id: 137,
    block_explorer: 'https://polygonscan.com/',
  },
];

export const SupportedTokens: SupportedToken[] = [
  {
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
    chain_id: 1,
    logo_uri: '',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    chain_id: 1,
    logo_uri: '',
    address: '',
  },
];
