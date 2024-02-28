import {
  type QuoteBridgeResult,
  type BridgeRequest,
  type SwapRequest,
  type QuoteBridgeRoute,
  type QuoteSwapResult,
  type QuoteSwapRoute,
} from '@argoplatform/transfer-sdk';

export type QuoteRoute = QuoteBridgeRoute | QuoteSwapRoute | undefined;
export type TransferRequest = BridgeRequest | SwapRequest | undefined;
export type QuoteResult = QuoteSwapResult | QuoteBridgeResult | undefined;

export class TransferAbstraction {
  selectedQuoteRoute: QuoteRoute;
  quoteResult: QuoteResult;
  transferRequest: TransferRequest;

  getSelectedQuoteRoute(): QuoteRoute {
    return this.selectedQuoteRoute;
  }

  getQuoteResult(): QuoteResult {
    return this.quoteResult;
  }

  getTransferRequest(): TransferRequest {
    return this.transferRequest;
  }

  setSelectedQuoteRoute(selectedQuoteRoute: QuoteRoute): void {
    this.selectedQuoteRoute = selectedQuoteRoute;
  }

  setQuoteResult(quoteResult: QuoteResult): void {
    this.quoteResult = quoteResult;
  }

  setTransferRequest(transferRequest: TransferRequest): void {
    this.transferRequest = transferRequest;
  }

  getQuoteResultAmount(): number {
    if (this.quoteResult === undefined) {
      return 0;
    } else if ('dst_amount_estimate' in this.quoteResult && typeof this.quoteResult.dst_amount_estimate === 'number') {
      return this.quoteResult.dst_amount_estimate;
    } else if ('amount' in this.quoteResult && typeof this.quoteResult.amount === 'number') {
      return this.quoteResult.amount;
    } else {
      return 0;
    }
  }

  reset(): void {
    this.selectedQuoteRoute = undefined;
    this.quoteResult = undefined;
    this.transferRequest = undefined;
  }
}
