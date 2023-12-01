import { type FunctionComponent, type ReactNode } from 'react';
import { type SupportedChain, type BasicRoute, type SupportedToken } from '@argoplatform/transfer-sdk';
import { type WidgetState } from 'models/const';
export interface RouteProps {
    route?: BasicRoute;
    toToken?: SupportedToken;
    toChain?: SupportedChain;
    fromToken?: SupportedToken;
    fromChain?: SupportedChain;
    widgetState: WidgetState;
}
export declare const DividerCircle: () => ReactNode;
export declare const Route: FunctionComponent<RouteProps>;
