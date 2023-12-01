import { type SupportedToken } from '@argoplatform/transfer-sdk';
export type Direction = 'to' | 'from';
export declare const Error: {
    default: {
        description: string;
    };
    gas: {
        description: string;
    };
    retrieving_bridge_routes: {
        description: string;
    };
    no_user_wallet: {
        description: string;
    };
    execute_bridge: {
        description: string;
    };
    no_bridge_routes: {
        description: string;
    };
    no_wallet_found: {
        description: string;
    };
};
export type ErrorType = keyof typeof Error;
export type SupportedTokensByChain = Record<number, SupportedToken[]>;
export declare const ButtonTheme: {
    default: {
        backgroundColor: string;
        textColor: string;
        hoverBackgroundColor: string;
        disabled: boolean;
    };
    error: {
        backgroundColor: string;
        textColor: string;
        hoverBackgroundColor: null;
        disabled: boolean;
    };
    disabled: {
        backgroundColor: string;
        textColor: string;
        hoverBackgroundColor: null;
        disabled: boolean;
    };
    loading: {
        backgroundColor: string;
        textColor: string;
        hoverBackgroundColor: null;
        disabled: boolean;
    };
};
export type WidgetView = 'selectTokenNetworkFrom' | 'selectTokenNetworkTo' | 'review' | 'default';
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
