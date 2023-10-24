import React, { type FunctionComponent } from 'react'
import {DefaultTooltip} from '../Tooltips/DefaultTooltip'
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export interface RouteDetailsProps {
    gas: string //Estimated gas fee for the route if 'selected' status
    fees: string // Estimated fee for the the route if 'selected' status
    time: string // Estimated time for the route if 'selected' status
    steps: number //Estimated number of steps a route has to take if 'selected' status
}

export const GasInfo: React.FC<{gas: string}> = ({gas}) => {
    return (
        <>
            <DefaultTooltip label = "Estimated gas price" side = 'bottom'>
                <div className = 'flex flex-row gap-1 items-center justify-center'>
                    <svg width="14" height="14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1650_15453)">
                        <path d="M58.276 8.89062L52.9426 3.55725C52.4218 3.03638 51.578 3.03638 51.0573 3.55725C50.5364 4.07812 50.5364 4.92188 51.0573 5.44263L55.4479 9.83325L51.0573 14.2239C50.8073 14.4739 50.6666 14.8124 50.6666 15.1666V19.1666C50.6666 22.1081 53.0586 24.5 56 24.5V47.1666C56 47.9023 55.4024 48.5 54.6666 48.5C53.931 48.5 53.3333 47.9024 53.3333 47.1666V44.5C53.3333 42.2943 51.539 40.5 49.3333 40.5H48V5.83337C48 2.89188 45.6081 0.5 42.6666 0.5H16C13.0586 0.5 10.6666 2.89188 10.6666 5.83337V53.8334C7.72525 53.8334 5.33325 56.2253 5.33325 59.1668V63.1668C5.33325 63.9038 5.92963 64.5001 6.66663 64.5001H52C52.737 64.5001 53.3334 63.9038 53.3334 63.1668V59.1668C53.3334 56.2254 50.9415 53.8334 48 53.8334V43.1668H49.3334C50.069 43.1668 50.6668 43.7644 50.6668 44.5001V47.1668C50.6668 49.3725 52.461 51.1668 54.6668 51.1668C56.8725 51.1668 58.6668 49.3725 58.6668 47.1668V9.83337C58.6666 9.47913 58.526 9.14062 58.276 8.89062ZM42.6666 23.1914C42.6666 23.9284 42.0703 24.5247 41.3333 24.5247H17.3333C16.5963 24.5247 15.9999 23.9284 15.9999 23.1914V7.16663C15.9999 6.42963 16.5963 5.83325 17.3333 5.83325H41.3333C42.0703 5.83325 42.6666 6.42963 42.6666 7.16663V23.1914Z" fill="#746F6F"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1650_15453">
                        <rect width="64" height="64" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                        </defs>
                    </svg>

                    <p className={'text-unselected-text font-manrope text-sm font-small'}>
                        ${gas}
                    </p>
                </div>
            </DefaultTooltip>
        </>
    )
}

export const FeeInfo: React.FC<{fees: string}> = ({fees}) => {
    return (
        <>
            <DefaultTooltip label = "Fee from route providers" side = 'bottom'>
                <div className = 'flex flex-row gap-1 items-center justify-center'>
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 12.5C9.31371 12.5 12 9.81371 12 6.5C12 3.18629 9.31371 0.5 6 0.5C2.68629 0.5 0 3.18629 0 6.5C0 9.81371 2.68629 12.5 6 12.5ZM5.7083 8.56402V9.097H6.3353V8.574C6.53479 8.55041 6.71579 8.50074 6.8783 8.425C7.1143 8.313 7.2973 8.159 7.4273 7.963C7.5593 7.765 7.6253 7.534 7.6253 7.27C7.6253 6.968 7.5443 6.726 7.3823 6.544C7.2203 6.362 6.9573 6.217 6.5933 6.109L5.7983 5.878C5.5783 5.812 5.4173 5.733 5.3153 5.641C5.2133 5.549 5.1623 5.437 5.1623 5.305C5.1623 5.185 5.1983 5.078 5.2703 4.984C5.3443 4.888 5.4433 4.814 5.5673 4.762C5.6933 4.708 5.8353 4.683 5.9933 4.687C6.1613 4.689 6.3123 4.723 6.4463 4.789C6.5823 4.855 6.6943 4.947 6.7823 5.065C6.8723 5.183 6.9313 5.319 6.9593 5.473L7.5983 5.359C7.5423 5.095 7.4413 4.869 7.2953 4.681C7.1513 4.493 6.9693 4.349 6.7493 4.249C6.62218 4.19069 6.48418 4.1487 6.3353 4.12303V3.583H5.7083V4.1112C5.53242 4.13425 5.37242 4.17918 5.2283 4.246C5.0083 4.348 4.8373 4.492 4.7153 4.678C4.5953 4.864 4.5353 5.083 4.5353 5.335C4.5353 5.869 4.8353 6.229 5.4353 6.415L6.4493 6.727C6.6453 6.789 6.7863 6.865 6.8723 6.955C6.9603 7.045 7.0043 7.162 7.0043 7.306C7.0043 7.508 6.9183 7.674 6.7463 7.804C6.5763 7.934 6.3553 7.999 6.0833 7.999C5.8093 7.999 5.5743 7.924 5.3783 7.774C5.1823 7.622 5.0543 7.418 4.9943 7.162L4.3733 7.261C4.4193 7.533 4.5173 7.769 4.6673 7.969C4.8193 8.167 5.0133 8.32 5.2493 8.428C5.39079 8.49275 5.54379 8.53809 5.7083 8.56402Z" fill="#746F6F"/>
                </svg>

                    <p className={'text-unselected-text font-manrope text-sm font-small'}>
                        ${fees}
                    </p>
                </div>
            </DefaultTooltip>
        </>
    )
}

export const TimeInfo: React.FC<{time: string}> = ({time}) => {
    return (
        <>  
            <DefaultTooltip label = "Estimated time for transaction" side = 'bottom'>
                    <div className = 'flex flex-row gap-1 items-center justify-center'>
                        <svg width="14" height="14" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1650_15475)">
                            <path d="M32 64.5C49.6686 64.5 64 50.1686 64 32.5C64 14.8314 49.6686 0.5 32 0.5C14.3314 0.5 0 14.8314 0 32.5C0 50.1686 14.3314 64.5 32 64.5ZM29.7142 14.2143C29.7142 12.9571 30.7428 11.9285 32 11.9285C33.2572 11.9285 34.2858 12.9571 34.2858 14.2143V31.4029L44.8572 39.86C45.8401 40.6486 46 42.0885 45.2114 43.0714C44.7657 43.6314 44.1029 43.9285 43.4285 43.9285C42.9257 43.9285 42.4228 43.7685 42 43.4257L30.5715 34.2829C30.0344 33.8486 29.7144 33.1972 29.7144 32.5V14.2143H29.7142Z" fill="#746F6F"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_1650_15475">
                            <rect width="64" height="64" fill="white" transform="translate(0 0.5)"/>
                            </clipPath>
                            </defs>
                        </svg>

                        <p className={'text-unselected-text font-manrope text-sm font-small'}>
                            {time}
                        </p>
                    </div>
                </DefaultTooltip>
        </>
    )
}



export const StepsInfo: React.FC<{steps: number}> = ({steps}) => {
    return (
        <>
            <DefaultTooltip label = "# of steps in route" side = 'bottom'>
                <div className = 'flex flex-row gap-1 items-center justify-center'>
                    <svg width="14" height="14" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 50.0595V64.395C0 64.453 0.0470097 64.5 0.105 64.5H63.895C63.953 64.5 64 64.453 64 64.395V0.605C64 0.54701 63.953 0.5 63.895 0.5H46.6505C46.5925 0.5 46.5455 0.54701 46.5455 0.605V17.8495C46.5455 17.9075 46.4984 17.9545 46.4405 17.9545H32.105C32.047 17.9545 32 18.0016 32 18.0595V32.395C32 32.453 31.953 32.5 31.895 32.5H14.6505C14.5925 32.5 14.5455 32.547 14.5455 32.605V49.8495C14.5455 49.9075 14.4984 49.9545 14.4405 49.9545H0.105C0.0470101 49.9545 0 50.0016 0 50.0595Z" fill="#746F6F"/>
                    </svg>

                    <p className={'text-unselected-text font-manrope text-sm font-small'}>
                        {steps}
                    </p>
                </div>
            </DefaultTooltip>
        </>
    )
}
