import { type FunctionComponent } from 'react';
import { type WalletClient } from 'viem';
export interface TransferWidgetProps {
    fromChainId?: number;
    toChainId?: number;
    fromTokenAddress?: string;
    toTokenAddress?: string;
    amountToBeTransferred?: string;
    isTestnet?: boolean;
    userAddress?: string;
    walletClient?: WalletClient;
}
export declare const TransferWidget: FunctionComponent<TransferWidgetProps>;
