import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React from "react";

interface DefaultTooltipProps {
    children: React.ReactNode;
    label: string;
    side: 'top' | 'bottom' | 'left' | 'right';
}

export const DefaultTooltip: React.FC<DefaultTooltipProps> = ({ children, label, side }) => {
  return (
    <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
            {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
            side={side}
            sideOffset={4}
            className="radix-side-top:animate-slide-down-fade 
            radix-side-right:animate-slide-left-fade 
            radix-side-bottom:animate-slide-up-fade 
            radix-side-left:animate-slide-right-fade 
            inline-flex items-center rounded-md px-2 py-2 bg-shadow-element border-1"
        >
            <span className="block text-xs leading-none text-accent-color font-manrope">
            {label}
            </span>
        </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
