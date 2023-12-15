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
  no_user_address: {
    description: 'No user wallet address.',
  },
  execute_bridge: {
    description: 'Error executing bridge.',
  },
  no_bridge_routes: {
    description: 'No bridge routes found.',
  },
  no_route_selected: {
    description: 'No route selected.',
  },
};

export type ErrorType = keyof typeof Error;

export type SupportedTokensByChain = Record<number, SupportedToken[]>;

export const ButtonTheme = {
  default: {
    backgroundColor: 'bg-success-green',
    textColor: 'text-black',
    hoverBackgroundColor: 'hover:bg-hover-green',
    disabled: false,
  },
  error: {
    backgroundColor: 'bg-failure-red',
    textColor: 'text-black',
    hoverBackgroundColor: null,
    disabled: true,
  },
  disabled: {
    backgroundColor: 'bg-component-background',
    textColor: 'text-unselected-text',
    hoverBackgroundColor: null,
    disabled: true,
  },
  loading: {
    backgroundColor: 'bg-component-background',
    textColor: 'text-unselected-text',
    hoverBackgroundColor: null,
    disabled: true,
  },
};

export type WidgetView = 'selectTokenNetworkFrom' | 'selectTokenNetworkTo' | 'review' | 'default' | 'settings';

export interface ButtonState {
  label?: string;
  type?: keyof typeof ButtonTheme;
  onClick?: () => void;
}

export interface WidgetState {
  error?: ErrorType;
  loading: boolean;
  buttonState: ButtonState;
  view: WidgetView;
}

export interface ReviewState {
  txnHash?: string;
  bridgeState?: 'notStarted' | 'started' | 'done';
}

export interface Settings {
  slippage?: number;
}
