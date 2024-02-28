import { type SupportedToken } from '@argoplatform/transfer-sdk';

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

export type Direction = 'to' | 'from';

export const Error = {
  default: {
    description: 'Something went wrong. Please try again.',
  },
  gas: {
    description: 'You do not have enough funds to pay for gas.',
  },
  retrieving_routes: {
    description: 'Error retrieving routes.',
  },
  no_user_wallet: {
    description: 'User wallet is not connected.',
  },
  no_user_address: {
    description: 'No user wallet address.',
  },
  execute: {
    description: 'Error executing.',
  },
  no_routes: {
    description: 'No routes found.',
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
    backgroundColor: (widgetTheme: WidgetTheme) =>
      widgetTheme === 'light' ? 'bg-component-background-light' : 'bg-component-background-dark',
    textColor: 'text-unselected-text',
    hoverBackgroundColor: null,
    disabled: true,
  },
  loading: {
    backgroundColor: (widgetTheme: WidgetTheme) =>
      widgetTheme === 'light' ? 'bg-component-background-light' : 'bg-component-background-dark',
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
  slippage: number;
}

export type WidgetTheme = 'default' | 'light';
