import { type FunctionComponent } from 'react';
import { type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { type Direction } from 'models/const';
export interface TokenSelectorProps {
    tokens?: SupportedToken[];
    handleTokenSelect: (token: SupportedToken) => void;
    selectedToken?: SupportedToken;
}
export interface TokenNetworkSelectorProps {
    direction: Direction;
    chains?: SupportedChain[];
    tokens?: SupportedToken[];
    selectedChain?: SupportedChain;
    selectedToken?: SupportedToken;
    handleChainSelect: (direction: Direction, chain?: SupportedChain) => void;
    handleTokenSelect: (direction: Direction, token?: SupportedToken) => void;
    onClose: () => void;
}
export declare const TokenNetworkSelector: FunctionComponent<TokenNetworkSelectorProps>;
