import React from 'react';
interface DefaultTooltipProps {
    children: React.ReactNode;
    label: string;
    side: 'top' | 'bottom' | 'left' | 'right';
}
export declare const DefaultTooltip: React.FC<DefaultTooltipProps>;
export {};
