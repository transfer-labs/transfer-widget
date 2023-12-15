import { type Route, type BasicRoute } from '@argoplatform/transfer-sdk';

export function areBasicRoutesEqual(r1?: BasicRoute, r2?: BasicRoute): boolean {
  if (r1 === undefined || r2 === undefined) return false;
  return r1.dstAmountEstimate === r2.dstAmountEstimate && r1.bridgeInfo.name === r2.bridgeInfo.name;
}

export function areBasicAndActualRoutesEqual(basicRoute: BasicRoute, actualRoute: Route): boolean {
  return basicRoute?.bridgeInfo.name === actualRoute?.bridgeInfo.name;
}

export function findRouteFromSelected(
  selectedRoute: BasicRoute,
  bestRoute: Route,
  alternateRoutes: Route[],
): Route | undefined {
  if (areBasicAndActualRoutesEqual(selectedRoute, bestRoute)) return bestRoute;
  if (alternateRoutes.length === 0) return undefined;
  return alternateRoutes.find((route) => areBasicAndActualRoutesEqual(selectedRoute, route));
}
