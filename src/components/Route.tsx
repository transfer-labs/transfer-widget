import React, { type FunctionComponent } from 'react'

export interface RouteProps {
    status: 'default' | 'selected'
    direction: 'from' | 'to'
    value?: string // The actual value if 'selected' status
    chainName?: string // The chain name if 'selected' status
    tokenName?: string // The token name if 'selected' status
    tokenLogo?: string // the token logo url if 'selected' status
    tokenNetwork?: string // the network url if 'selected' status
    balance?: string // Balance of the token if 'selected' status
  }


const Route: FunctionComponent<RouteProps> = 
    ({
        status,
        direction,
        value,
        chainName,
        tokenName,
        tokenLogo,
        tokenNetwork,
        balance,
    }) => {
    return (
        <div className = 'flex flex-col w-full bg-modal-background border border-success-green rounded-lg py-3 px-4'>
             <p>hi</p>
        </div>
    );
}

export default Route;