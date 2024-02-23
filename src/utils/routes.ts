import { type BridgeRoute, type QuoteBridgeRoute } from '@argoplatform/transfer-sdk';

export function areBasicRoutesEqual(r1?: QuoteBridgeRoute, r2?: QuoteBridgeRoute): boolean {
  if (r1 === undefined || r2 === undefined) return false;
  return r1.dst_amount_estimate === r2.dst_amount_estimate && r1.bridge_info.name === r2.bridge_info.name;
}

export function areBasicAndActualRoutesEqual(quoteRoute: QuoteBridgeRoute, actualRoute: BridgeRoute): boolean {
  return quoteRoute?.bridge_info.name === actualRoute?.bridge_info.name;
}

export function findRouteFromSelected(
  selectedRoute: QuoteBridgeRoute,
  bestRoute: BridgeRoute,
  alternateRoutes: BridgeRoute[],
): BridgeRoute | undefined {
  if (areBasicAndActualRoutesEqual(selectedRoute, bestRoute)) return bestRoute;
  if (alternateRoutes.length === 0) return undefined;
  return alternateRoutes.find((route) => areBasicAndActualRoutesEqual(selectedRoute, route));
}
