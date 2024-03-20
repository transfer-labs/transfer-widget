interface UseBalanceReturn {
  truncate: (amount: string | number, decimals?: number) => string;
  round: (amount: string | number, decimals?: number) => string;
}

export function useBalance(): UseBalanceReturn {
  function truncate(amount: string | number, decimals: number = 3): string {
    if (typeof amount === 'number') {
      amount = amount.toString();
    }
    const parts = amount.split('.');
    if (parts.length === 1) {
      return parts[0];
    }
    return `${parts[0]}.${parts[1].substring(0, decimals)}`;
  }

  function round(amount: string | number, decimals: number = 3): string {
    if (typeof amount === 'string') {
      amount = +amount;
    }
    return amount.toFixed(decimals);
  }

  return {
    truncate,
    round,
  };
}
