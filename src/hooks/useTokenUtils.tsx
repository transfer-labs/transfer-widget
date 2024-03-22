import { type SupportedToken } from '@argoplatform/transfer-sdk';
import { NULL_ADDRESS } from '../models/const';

interface UseTokenReturn {
  toTokenDecimals: (decimals: number, amount: string) => string;
  toTokenReadable: (decimals: number, amount: number) => string;
  shortenAddress: (address?: string, chars?: number) => string;
  isNullAddress: (address: string) => boolean;
  isAddress: (address: string) => boolean;
  getEmptyToken: (address: string, chainId: number) => SupportedToken;
}

export function useTokenUtils(): UseTokenReturn {
  // Converts a token amount to its wei representation
  function toTokenDecimals(decimals: number, amount: string): string {
    return (+amount * 10 ** decimals).toString();
  }

  function toTokenReadable(decimals: number, amount: number): string {
    return (amount / 10 ** decimals).toFixed(3);
  }

  function shortenAddress(address?: string, chars = 4): string {
    if (address === undefined || address.length < chars * 2 + 2) return '';
    return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
  }

  function isNullAddress(address: string): boolean {
    return address === NULL_ADDRESS;
  }

  function isAddress(address: string): boolean {
    return address.length === 42 && address.startsWith('0x');
  }

  function getEmptyToken(address: string, chainId: number): SupportedToken {
    return {
      chainId,
      address,
      decimals: 18,
      symbol: shortenAddress(address, 2),
      name: 'Unknown',
    };
  }

  return {
    toTokenDecimals,
    toTokenReadable,
    shortenAddress,
    isNullAddress,
    isAddress,
    getEmptyToken,
  };
}
