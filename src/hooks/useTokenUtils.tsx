interface UseTokenReturn {
  toTokenDecimals: (decimals: number, amount: string) => string;
  toTokenReadable: (decimals: number, amount: number) => string;
  test: string;
}

export function useTokenUtils(): UseTokenReturn {
  const test = 'TEST';
  function toTokenDecimals(decimals: number, amount: string): string {
    return (+amount * 10 ** decimals).toString();
  }

  function toTokenReadable(decimals: number, amount: number): string {
    return (amount / 10 ** decimals).toFixed(3);
  }

  return {
    toTokenDecimals,
    toTokenReadable,
    test,
  };
}
