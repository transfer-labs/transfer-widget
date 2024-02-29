import {
  type QuoteBridgeRoute,
  type QuoteSwapRoute,
  type QuoteSwapResult,
  type QuoteBridgeResult,
} from '@argoplatform/transfer-sdk';
import { type QuoteResult, type QuoteRoute, type Route } from '../models/transfer';

export function isRouteSwap(quoteRoute: QuoteRoute): quoteRoute is QuoteSwapRoute {
  return (quoteRoute as QuoteSwapRoute).amount !== undefined;
}

export function isRouteBridge(quoteRoute: QuoteRoute): quoteRoute is QuoteBridgeRoute {
  return (quoteRoute as QuoteBridgeRoute).bridge_info !== undefined;
}

export function isResultSwap(quoteResult: QuoteResult): quoteResult is QuoteSwapResult {
  if (Object.keys(quoteResult.best_route).length === 0) return true;
  return (quoteResult as QuoteSwapResult).best_route.amount !== undefined;
}

export function isResultBridge(quoteResult: QuoteResult): quoteResult is QuoteBridgeResult {
  return (quoteResult as QuoteBridgeResult).best_route.bridge_info !== undefined;
}

function areBridgeRoutesEqual(r1: QuoteBridgeRoute, r2: QuoteBridgeRoute): boolean {
  return r1.bridge_info.name === r2.bridge_info.name && r1.dst_amount_estimate === r2.dst_amount_estimate;
}

function areSwapRoutesEqual(r1: QuoteSwapRoute, r2: QuoteSwapRoute): boolean {
  return r1.amount === r2.amount && r1.dexs === r2.dexs;
}

export function areRoutesEqual(r1?: QuoteRoute, r2?: QuoteRoute): boolean {
  if (r1 === undefined || r2 === undefined) return false;
  if (isRouteBridge(r1) && isRouteBridge(r2)) {
    return areBridgeRoutesEqual(r1, r2);
  } else if (isRouteSwap(r1) && isRouteSwap(r2)) {
    return areSwapRoutesEqual(r1, r2);
  } else {
    return false;
  }
}

export function getAmount(route: QuoteRoute): number {
  if (isRouteBridge(route)) {
    return route.dst_amount_estimate;
  } else {
    return route.amount;
  }
}

export function findRouteFromSelected(
  selectedRoute: QuoteRoute,
  bestRoute: Route,
  alternateRoutes: Route[],
): Route | undefined {
  if (areRoutesEqual(selectedRoute, bestRoute)) return bestRoute;
  if (alternateRoutes.length === 0) return undefined;
  return alternateRoutes.find((route) => areRoutesEqual(selectedRoute, route));
}
