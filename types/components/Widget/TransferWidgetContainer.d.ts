import { type FunctionComponent } from 'react';
import { type SupportedChain, type SupportedToken, type QuoteResult } from '@argoplatform/transfer-sdk';
import { type ReviewState, type Direction, type SupportedTokensByChain } from 'models/const';
import { type WidgetState } from '../../models/const';
export interface TransferWidgetContainerProps {
    supportedChains?: SupportedChain[];
    supportedTokensByChain?: SupportedTokensByChain;
    fromChain?: SupportedChain;
    fromToken?: SupportedToken;
    toChain?: SupportedChain;
    toToken?: SupportedToken;
    handleChainSelect: (direction: Direction, chain?: SupportedChain) => void;
    handleTokenSelect: (direction: Direction, token?: SupportedToken) => void;
    setAmountToBeTransferred: (amount: string) => void;
    amountToBeTransferred?: string;
    quoteResult?: QuoteResult;
    userAddress?: string;
    widgetState: WidgetState;
    reviewState?: ReviewState;
    setWidgetState: (state: WidgetState) => void;
}
export declare const TransferWidgetContainer: FunctionComponent<TransferWidgetContainerProps>;
