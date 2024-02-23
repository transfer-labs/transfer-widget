import { type Route, type BasicRoute } from '@argoplatform/transfer-sdk';

export function areBasicRoutesEqual(r1?: BasicRoute, r2?: BasicRoute): boolean {
  if (r1 === undefined || r2 === undefined) return false;
  return r1.dst_amount_estimate === r2.dst_amount_estimate && r1.bridge_info.name === r2.bridge_info.name;
}

export function areBasicAndActualRoutesEqual(basicRoute: BasicRoute, actualRoute: Route): boolean {
  return basicRoute?.bridge_info.name === actualRoute?.bridge_info.name;
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
