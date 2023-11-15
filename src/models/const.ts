import { type SupportedToken } from '@argoplatform/transfer-sdk';

export type Direction = 'to' | 'from';

export const Error = {
  default: {
    description: 'Something went wrong. Please try again.',
  },
  gas: {
    description: 'You do not have enough funds to pay for gas.',
  },
  retrieving_bridge_routes: {
    description: 'Error retrieving bridge routes.',
  },
  no_user_wallet: {
    description: 'User wallet is not connected.',
  },
  execute_bridge: {
    description: 'Error executing bridge.',
  },
};

export type ErrorType = keyof typeof Error;

export type SupportedTokensByChain = Record<number, SupportedToken[]>;

export type WidgetViewType = 'selectTokenNetworkFrom' | 'selectTokenNetworkTo' | 'review' | undefined;
