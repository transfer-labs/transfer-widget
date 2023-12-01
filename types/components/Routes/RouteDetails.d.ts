import { type FunctionComponent } from 'react';
export interface RouteDetailsProps {
    gas?: string;
    fees?: string;
    time?: string;
    steps?: number;
}
interface InfoProps {
    value?: string | number;
    side?: 'left' | 'right' | 'top' | 'bottom';
    color?: string;
}
export declare const GasInfo: FunctionComponent<InfoProps>;
export declare const FeeInfo: FunctionComponent<InfoProps>;
export declare const TimeInfo: FunctionComponent<InfoProps>;
export declare const RouteDetails: FunctionComponent<RouteDetailsProps>;
export {};
