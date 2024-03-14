import { NULL_ADDRESS } from '../models/const';

interface UseTokenReturn {
  toTokenDecimals: (decimals: number, amount: string) => string;
  toTokenReadable: (decimals: number, amount: number) => string;
  shortenAddress: (address?: string, chars?: number) => string;
  isNullAddress: (address: string) => boolean;
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

  return {
    toTokenDecimals,
    toTokenReadable,
    shortenAddress,
    isNullAddress,
  };
}
