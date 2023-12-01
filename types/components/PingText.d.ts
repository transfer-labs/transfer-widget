import { type FunctionComponent } from 'react';
interface PingTextProps {
    status: 'loading' | 'error' | 'success';
    text?: string;
}
export declare const PingText: FunctionComponent<PingTextProps>;
export {};
