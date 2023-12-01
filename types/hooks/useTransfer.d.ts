import { type Transfer, type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { type SupportedTokensByChain } from '../models/const';
interface Props {
    transfer: Transfer;
}
interface UseTransfer {
    supportedChains: SupportedChain[] | undefined;
    supportedTokensByChain: SupportedTokensByChain | undefined;
    getSupportedTokens: (chainId: number) => Promise<SupportedToken[] | undefined>;
}
export declare function useTransfer({ transfer }: Props): UseTransfer;
export {};
