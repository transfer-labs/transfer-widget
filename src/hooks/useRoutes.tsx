import {
  type QuoteRoute,
  type RouteResponse,
  type Route,
  type SupportedChain,
  type SupportedToken,
} from '@argoplatform/transfer-sdk';
import { capitalize } from '../utils/text';

interface UseRoutesReturn {
  areRoutesEqual: (r1?: QuoteRoute, r2?: QuoteRoute) => boolean;
  findRoute: (selectedRoute: QuoteRoute, routeResponse: RouteResponse) => Route | undefined;
  getRouteSteps: (
    route: QuoteRoute,
    fromChain: SupportedChain,
    toChain: SupportedChain,
    fromToken: SupportedToken,
    toToken: SupportedToken,
  ) => RouteStep[];
}

interface RouteStep {
  text: string;
  logoUri?: string;
}

export function useRoutes(): UseRoutesReturn {
  function areRoutesEqual(r1?: QuoteRoute, r2?: QuoteRoute): boolean {
    if (r1 === undefined || r2 === undefined) {
      return false;
    } else if (r1.bridgeProvider !== undefined && r2.bridgeProvider !== undefined) {
      return r1.bridgeProvider.name === r2.bridgeProvider.name;
    } else {
      return (
        r1.aggrgators.length === r2.aggrgators.length &&
        r1.dexs.length === r2.dexs.length &&
        r1.dexs.length > 0 &&
        r2.dexs.length > 0 &&
        r1.dexs[0].name === r2.dexs[0].name
      );
    }
  }

  function findRoute(selectedRoute: QuoteRoute, routeResponse: RouteResponse): Route | undefined {
    if (areRoutesEqual(selectedRoute, routeResponse.bestRoute)) return routeResponse.bestRoute;
    if (routeResponse.alternativeRoutes.length === 0) return undefined;
    return routeResponse.alternativeRoutes.find((route) => areRoutesEqual(selectedRoute, route));
  }

  function getRouteSteps(
    route: QuoteRoute,
    fromChain: SupportedChain,
    toChain: SupportedChain,
    fromToken: SupportedToken,
    toToken: SupportedToken,
  ): RouteStep[] {
    const steps: RouteStep[] = [];
    steps.push({
      text: `Send ${fromToken.symbol} from ${fromChain.name}`,
      logoUri: fromToken.logo_uri,
    });

    route.dexs.forEach((dex) => {
      if (dex.chainId === fromChain.chain_id) {
        steps.push({
          text: `Swap on ${dex.name}`,
          logoUri: fromChain.logo_uri,
        });
      }
    });

    if (route.bridgeProvider !== undefined) {
      steps.push({
        text: `Bridge through ${capitalize(route.bridgeProvider.name)}`,
        logoUri: route.bridgeProvider.logoUri,
      });
    }

    route.dexs.forEach((dex) => {
      if (dex.chainId === toChain.chain_id) {
        steps.push({
          text: `Swap on ${dex.name}`,
          logoUri: toChain.logo_uri,
        });
      }
    });

    steps.push({
      text: `Receive ${toToken.symbol} from ${toChain.name}`,
      logoUri: toToken.logo_uri,
    });
    return steps;
  }

  return {
    areRoutesEqual,
    findRoute,
    getRouteSteps,
  };
}
