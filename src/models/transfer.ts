import {
  type QuoteBridgeResult,
  type QuoteBridgeRoute,
  type QuoteSwapResult,
  type QuoteSwapRoute,
  type BridgeRoute,
  type SwapRoute,
  type BridgeResult,
  type SwapResult,
} from '@argoplatform/transfer-sdk';

export type QuoteRoute = QuoteBridgeRoute | QuoteSwapRoute;
export type QuoteResult = QuoteBridgeResult | QuoteSwapResult;
export type TransferResult = BridgeResult | SwapResult;
export type Route = SwapRoute | BridgeRoute;
