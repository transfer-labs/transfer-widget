import {
  type QuoteRoute,
  type RouteResponse,
  type Route,
  type SupportedChain,
  type SupportedToken,
  type Fee,
} from '@argoplatform/transfer-sdk';
import { capitalize } from '../utils/text';
import { useBalance } from './useBalance';

interface UseRoutesReturn {
  areRoutesEqual: (r1?: QuoteRoute, r2?: QuoteRoute) => boolean;
  findRoute: (selectedRoute: QuoteRoute, routeResponse: RouteResponse) => Route | undefined;
  getTotalFees: (fees: Fee[]) => string;
  getEstimateTime: (time: number) => string;
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
  const { round } = useBalance();
  function areRoutesEqual(r1?: QuoteRoute, r2?: QuoteRoute): boolean {
    if (r1 === undefined || r2 === undefined) {
      return false;
    } else if (r1.bridgeProvider !== undefined && r2.bridgeProvider !== undefined) {
      return r1.bridgeProvider.name === r2.bridgeProvider.name;
    } else {
      return (
        r1.aggregators.length === r2.aggregators.length &&
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

  function getTotalFees(fees: Fee[]): string {
    const fee = fees.reduce((acc, fee) => acc + (isNaN(fee.usdAmount) ? 0 : fee.usdAmount), 0);
    return `$${round(fee, 2)}`;
  }

  function getEstimateTime(time: number): string {
    if (time === 0) {
      return 'Instant';
    } else if (time < 60) {
      return `~${time} sec`;
    } else {
      return `~${Math.floor(time / 60)} min`;
    }
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
      logoUri: fromToken.logoUri,
    });

    route.dexs.forEach((dex) => {
      if (dex.chainId === fromChain.chainId) {
        steps.push({
          text: `Swap on ${dex.name}`,
          logoUri: fromChain.logoUri,
        });
      }
    });

    if (route.bridgeProvider !== undefined) {
      steps.push({
        text: `Bridge through ${capitalize(route.bridgeProvider.name)}`,
        logoUri: route.bridgeProvider.logoUri,
      });
    }

    if (fromChain.chainId !== toChain.chainId) {
      route.dexs.forEach((dex) => {
        if (dex.chainId === toChain.chainId) {
          steps.push({
            text: `Swap on ${dex.name}`,
            logoUri: toChain.logoUri,
          });
        }
      });
    }

    steps.push({
      text: `Receive ${toToken.symbol} from ${toChain.name}`,
      logoUri: toToken.logoUri,
    });
    return steps;
  }

  return {
    areRoutesEqual,
    findRoute,
    getRouteSteps,
    getTotalFees,
    getEstimateTime,
  };
}
