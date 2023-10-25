import React, { type FunctionComponent, useState } from 'react';
import Best from '../../icons/routes/best-route.png';
import TokenNetworkImage from '../TokenNetworkImage';
import Expand from '../../icons/routes/expand-route/expand-close.png';
import { GasInfo, FeeInfo, TimeInfo, StepsInfo, type RouteDetailsProps } from './RouteDetails';
import { DefaultTooltip } from '../Tooltips/DefaultTooltip';

export interface RouteProps {
  status: 'default' | 'selected' | 'error' | 'gas-error';
  direction: 'from' | 'to';
  value?: string; // The actual value if 'selected' status
  type?: 'Bridge' | 'Bridge and Swap' | 'Swap' | 'Swap and Bridge';
  bridge?: string; // name of the bridge for the swap if 'selected'
  bridgeLogo?: string; // bridge logo if 'selected' status
  chainName?: string; // The chain name if 'selected' status
  tokenName?: string; // The token name if 'selected' status
  tokenLogo?: string; // the token logo url if 'selected' status
  tokenNetwork?: string; // the network url if 'selected' status
  balance?: string; // Balance of the token if 'selected' status
  details: RouteDetailsProps; // Details of the route if 'selected' status
}

const Route: FunctionComponent<RouteProps> = ({
  status,
  direction,
  value,
  type,
  bridge,
  bridgeLogo,
  chainName,
  tokenName,
  tokenLogo,
  tokenNetwork,
  balance,
  details,
}) => {
  const DividerCircle = () => {
    return (
      <svg width='5' height='5' viewBox='0 0 5 5' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='2.5' cy='2.5' r='2.5' fill='#C4C4C4' />
      </svg>
    );
  };

  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const ExpandedRoute = () => {
    return <div className='flex flex-col gap-1'>{bridge}</div>;
  };

  return (
    <div
      className={`flex flex-col gap-4 w-full bg-component-background ${
        status === 'error' ? 'border border-failure-red' : 'border border-success-green'
      } rounded-lg py-3 px-4 ${status === 'gas-error' ? 'opacity-30' : 'opacity-100'}`}
    >
      {status === 'error' ? (
        <p className={'text-failure-red font-manrope text-md font-medium text-center'}>
          Unable to find successful route
        </p>
      ) : (
        <>
          {/* top routes and best icon (if route is the best) */}
          <div className='flex flex-row justify-between w-full'>
            <p className={'text-white font-manrope text-md font-semibold'}>{type}</p>

            <DefaultTooltip label='Best route based on price, speed, and slippage' side='left'>
              <img src={Best} className='w-[45px]' />
            </DefaultTooltip>
          </div>

          <div className={`flex flex-col ${isClicked ? 'gap-2' : 'gap-0'}`}>
            {/* token, bridge info (unexpanded), and expanded button  */}
            <div className='relative flex flex-row justify-between w-full items-start sm:items-center'>
              <div className='flex flex-row gap-1 items-center justify-center'>
                <TokenNetworkImage logo={tokenLogo} network={tokenNetwork} />
                <div className='flex flex-col'>
                  <p className={'text-white font-manrope text-xl font-medium'}>
                    {value} {tokenName}
                  </p>
                  <div className='flex flex-row gap-1 items-center'>
                    <p className={'text-accent-color font-manrope text-sm font-medium'}>{chainName}</p>
                    <DividerCircle />
                    <div className='flex flex-row gap-.25 items-center'>
                      <img src={bridgeLogo} className='w-4 h-4' />
                      <p className={'text-accent-color font-manrope text-sm font-medium'}>{bridge}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='absolute right-0 top-1/2 transform -translate-y-1/2'
                onMouseEnter={() => {
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                }}
                onClick={() => {
                  setIsClicked(!isClicked);
                }}
                style={{
                  transition: 'transform 0.3s ease-in-out',
                  transform: isClicked ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <DefaultTooltip label='View route steps' side='left'>
                  <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect x='0.5' y='0.5' width='29' height='29' rx='8.5' fill='#242424' />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M14.5 10C14.7761 10 15 10.2239 15 10.5V19.2929L18.1464 16.1465C18.3417 15.9512 18.6583 15.9512 18.8536 16.1465C19.0488 16.3417 19.0488 16.6583 18.8536 16.8535L14.8536 20.8536C14.7598 20.9473 14.6326 21 14.5 21C14.3674 21 14.2402 20.9473 14.1465 20.8536L10.1465 16.8535C9.95118 16.6583 9.95118 16.3417 10.1465 16.1465C10.3417 15.9512 10.6583 15.9512 10.8536 16.1465L14 19.2929V10.5C14 10.2239 14.2239 10 14.5 10Z'
                      fill='white'
                    />
                    <rect x='0.5' y='0.5' width='29' height='29' rx='8.5' stroke={isHovered ? 'white' : '#2A2A2E'} />
                  </svg>
                </DefaultTooltip>
              </div>
            </div>

            {/* the expanded route details with slide down animation */}
            <div className='relative'>
              {isClicked ? (
                <div className='transition-transform duration-500 ease-in-out transform translate-y-0 flex flex-col gap-.5'>
                  <div className='flex flex-row gap-.25 items-center'>
                    <img src={bridgeLogo} className='w-5 h-5' />
                    <p className={'text-accent-color font-manrope text-lg font-medium'}>{bridge}</p>
                  </div>

                  <p className='text-accent-color font-manrope text-sm m-0'>
                    {type} into {tokenName} using {bridge}
                  </p>
                </div>
              ) : (
                <div className='absolute transition-transform duration-500 ease-in-out transform -translate-y-full opacity-0' />
              )}
            </div>
          </div>

          {/* icons regarding the route details */}
          <div className='flex flex-row justify-between w-full items-center'>
            <GasInfo gas={details.gas} />
            <FeeInfo fees={details.fees} />
            <TimeInfo time={details.time} />
            <StepsInfo steps={details.steps} />
          </div>
        </>
      )}
    </div>
  );
};

export default Route;
