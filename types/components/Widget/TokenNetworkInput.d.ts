import { type FunctionComponent } from 'react';
import { type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { type Direction } from 'models/const';
export interface TokenNetworkInputProps {
    direction: Direction;
    amount?: string;
    chain?: SupportedChain;
    token?: SupportedToken;
    balance?: string;
    onAnchorClick: () => void;
    setAmount?: (amount: string) => void;
}
export declare const TokenNetworkInput: FunctionComponent<TokenNetworkInputProps>;
