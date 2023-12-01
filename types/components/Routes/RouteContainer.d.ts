import { type FunctionComponent } from 'react';
import { type SupportedChain, type SupportedToken, type QuoteResult } from '@argoplatform/transfer-sdk';
import { type WidgetState } from 'models/const';
export interface RouteContainerProps {
    quoteResult?: QuoteResult;
    fromChain?: SupportedChain;
    toChain?: SupportedChain;
    fromToken?: SupportedToken;
    toToken?: SupportedToken;
    widgetState: WidgetState;
}
export declare const RouteContainer: FunctionComponent<RouteContainerProps>;
