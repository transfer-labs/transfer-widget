import { type FunctionComponent } from 'react';
import { type SupportedToken, type BasicRoute, type SupportedChain } from '@argoplatform/transfer-sdk';
import { type WidgetState, type ReviewState } from 'models/const';
export interface ReviewRouteProps {
    route: BasicRoute;
    fromToken?: SupportedToken;
    toToken?: SupportedToken;
    fromChain?: SupportedChain;
    toChain?: SupportedChain;
    widgetState: WidgetState;
    reviewState?: ReviewState;
    onClose: () => void;
}
export declare const ReviewRoute: FunctionComponent<ReviewRouteProps>;
