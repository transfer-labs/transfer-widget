import USDC from '../../src/icons/network-token-examples/USDC.png';
import Ether from '../../src/icons/network-token-examples/token.png';
import fromNetwork from '../../src/icons/network-token-examples/from-chain.png';
import toNetwork from '../../src/icons/network-token-examples/to-chain.png';
import Bridge from '../icons/routes/stargate.png';
import { type SupportedToken, type SupportedChain } from '@argoplatform/transfer-sdk';

export const SupportedChains: SupportedChain[] = [
  {
    name: 'ethereum',
    logoURI: fromNetwork,
    isTestnet: false,
    chainId: 1,
  },
  {
    name: 'polygon',
    logoURI: toNetwork,
    isTestnet: false,
    chainId: 137,
  },
];

export const SupportedTokens: SupportedToken[] = [
  {
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
    chainId: 1,
    logoURI: USDC,
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    chainId: 1,
    logoURI: Ether,
    address: '',
  },
];
