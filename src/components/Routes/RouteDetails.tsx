import React, { type FunctionComponent } from 'react'
import {DefaultTooltip} from '../Tooltips/DefaultTooltip'
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export interface RouteDetailsProps {
    gas: string //Estimated gas fee for the route if 'selected' status
    fees: string // Estimated fee for the the route if 'selected' status
    time: string // Estimated time for the route if 'selected' status
    steps: number //Estimated number of steps a route has to take if 'selected' status
}

import { ClockIcon } from "@radix-ui/react-icons";

interface GasInfoProps {
    gas: string,
    color: string,
    side: 'left' | 'right' | 'top' | 'bottom'
}



export const GasInfo: React.FC<GasInfoProps> = ({gas, color, side}) => {
    return (
        <>
            <DefaultTooltip label = "Estimated gas price" side = {side}>
                <div className = 'flex flex-row gap-1 items-center justify-center'>
                <svg width="12" height="12" className = {`text-${color} fill-current`}><g clip-path="url(#a)"><path d="m10.927 1.573-1-1a.25.25 0 1 0-.354.354l.823.823-.823.823a.25.25 0 0 0-.073.177v.75c0 .552.449 1 1 1v4.25a.25.25 0 0 1-.5 0v-.5a.75.75 0 0 0-.75-.75H9V1c0-.552-.448-1-1-1H3c-.551 0-1 .448-1 1v9c-.552 0-1 .448-1 1v.75c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V11c0-.552-.448-1-1-1V8h.25a.25.25 0 0 1 .25.25v.5a.75.75 0 0 0 1.5 0v-7a.25.25 0 0 0-.073-.177ZM8 4.255a.25.25 0 0 1-.25.25h-4.5a.25.25 0 0 1-.25-.25V1.25A.25.25 0 0 1 3.25 1h4.5a.25.25 0 0 1 .25.25v3.005Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h12v12H0z"/></clipPath></defs></svg>
                    <p className={'text-unselected-text font-manrope text-sm font-small'}>
                        ${gas}
                    </p>
                </div>
            </DefaultTooltip>
        </>
    )
}

interface FeesInfoProps {
    fees: string,
    color: string,
    side: 'left' | 'right' | 'top' | 'bottom'
}


export const FeeInfo: React.FC<FeesInfoProps> = ({fees, color, side}) => {
    return (
        <>
            <DefaultTooltip label = "Fee from route providers" side = {side}>
                <div className={`flex flex-row gap-1 items-center justify-center text-${color}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" className = {`text-${color} fill-current`}>
                    <path fill-rule="evenodd" d="M6 12.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-.292-3.936v.533h.627v-.523c.2-.024.38-.073.543-.149.236-.112.42-.266.55-.462a1.22 1.22 0 0 0 .197-.693c0-.302-.08-.544-.243-.726-.162-.182-.425-.327-.789-.435l-.795-.231c-.22-.066-.38-.145-.483-.237a.436.436 0 0 1-.153-.336c0-.12.036-.227.108-.321a.715.715 0 0 1 .297-.222c.126-.054.268-.079.426-.075.168.002.32.036.453.102a.94.94 0 0 1 .513.684l.64-.114a1.644 1.644 0 0 0-.304-.678 1.413 1.413 0 0 0-.546-.432 1.668 1.668 0 0 0-.414-.126v-.54h-.627v.528a1.642 1.642 0 0 0-.48.135 1.2 1.2 0 0 0-.513.432c-.12.186-.18.405-.18.657 0 .534.3.894.9 1.08l1.014.312c.196.062.337.138.423.228a.48.48 0 0 1 .132.351.599.599 0 0 1-.258.498c-.17.13-.39.195-.663.195-.274 0-.509-.075-.705-.225a1.052 1.052 0 0 1-.384-.612l-.62.099c.045.272.143.508.293.708.152.198.346.351.582.459.142.065.295.11.46.136Z" clip-rule="evenodd"/>
                </svg>

                    <p className={`text-${color} font-manrope text-sm font-small`}>
                        ${fees}
                    </p>
                </div>
            </DefaultTooltip>
        </>
    )
}

interface TimeInfoProps {
    time: string,
    color: string,
    side: 'left' | 'right' | 'top' | 'bottom'
} 

export const TimeInfo: React.FC<TimeInfoProps> = ({time, color, side}) => {
    return (
        <>  
            <DefaultTooltip label = "Estimated time for transaction" side={side}>
                    <div className = 'flex flex-row gap-1 items-center justify-center'>
                        <div className={`text-${color}`}>
                            <ClockIcon/>
                        </div>
                        <p className={`text-${color} font-manrope text-sm font-small`}>
                            {time}
                        </p>
                    </div>
                </DefaultTooltip>
        </>
    )
}

interface StepsInfoProps {
    steps: number,
    color: string,
    side: 'left' | 'right' | 'top' | 'bottom'
}


export const StepsInfo: React.FC<StepsInfoProps> = ({steps,color,side}) => {
    return (
        <>
            <DefaultTooltip label = "# of steps in route" side = {side}>
                <div className = 'flex flex-row gap-1 items-center justify-center'>
                <svg width="12" height="12" className = {`text-${color} fill-current`} >
                    <path d="M0 9.378v2.517c0 .058.047.105.105.105h11.79a.105.105 0 0 0 .105-.105V.105A.105.105 0 0 0 11.895 0H8.832a.105.105 0 0 0-.105.105v3.063a.105.105 0 0 1-.105.105H6.105A.105.105 0 0 0 6 3.378v2.517A.105.105 0 0 1 5.895 6H2.832a.105.105 0 0 0-.105.105v3.063a.105.105 0 0 1-.105.105H.105A.105.105 0 0 0 0 9.378Z"/>
                </svg>
                    <p className={'text-unselected-text font-manrope text-sm font-small'}>
                        {steps}
                    </p>
                </div>
            </DefaultTooltip>
        </>
    )
}
