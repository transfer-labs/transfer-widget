import React, { useEffect, type FunctionComponent } from 'react';
import { useState } from 'react';
import { TokenNetworkImage } from './TokenNetworkImage';
import { type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { type Direction, type WidgetTheme } from '../../models/const';
import { useBalance } from '../../hooks/useBalance';
import { type PortfolioMap } from '../../hooks/useTransfer';

export interface TokenNetworkInputProps {
  direction: Direction;
  amount?: string;
  chain?: SupportedChain;
  token?: SupportedToken;
  onAnchorClick: () => void;
  setAmount?: (amount: string) => void;
  theme?: WidgetTheme;
  portfolioMap?: PortfolioMap;
}

export const TokenNetworkInput: FunctionComponent<TokenNetworkInputProps> = ({
  direction,
  amount,
  chain,
  token,
  setAmount,
  onAnchorClick,
  theme,
  portfolioMap,
}) => {
  const [balance, setBalance] = useState<string>('0.0');

  useEffect(() => {
    if (chain !== undefined && token !== undefined && portfolioMap?.[chain.chainId]?.[token.address] !== undefined) {
      setBalance(truncate(portfolioMap[chain.chainId][token.address].balance));
    } else {
      setBalance('0.0');
    }
  }, [chain, token, portfolioMap]);

  const { truncate } = useBalance();

  function handleAmountChange(amount: string): void {
    if (setAmount !== undefined && direction === 'from') {
      setAmount(amount);
    }
  }

  return (
    <div
      className={`flex px-4 py-3 flex-col gap-3 border rounded-lg ${
        theme === 'light' ? 'border-border-color-light' : 'border-border-color-dark'
      } ${theme === 'light' ? 'bg-component-background-light' : 'bg-component-background-dark'}`}
    >
      <p className={`font-manrope text-lg font-medium ${theme === 'light' ? 'text-black' : 'text-white'}`}>
        {direction.charAt(0).toUpperCase() + direction.slice(1)}
      </p>
      <div className='flex flex-row items-center gap-1 h-10'>
        <input
          className={`w-full text-3xl bg-component-background-${
            theme === 'light' ? 'light' : 'dark'
          } border-none outline-none font-bold  ${
            amount !== undefined && +amount > 0
              ? theme === 'light'
                ? 'text-black'
                : 'text-white'
              : 'text-unselected-text'
          } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          type='number'
          value={amount}
          placeholder='0'
          disabled={direction === 'to'}
          onChange={(e) => {
            handleAmountChange(e.target.value);
          }}
        />
        {direction === 'from' && balance !== '0.0' && (
          <button
            className='bg-tooltip-green border-border-color-dark text-sm text-success-green rounded-md py-1 px-2 mx-4'
            onClick={() => {
              handleAmountChange(balance);
            }}
          >
            Max
          </button>
        )}
        <div className='flex flex-col'>
          {chain !== undefined && token !== undefined ? (
            <div className='flex flex-row gap-4 justify-center items-center cursor-pointer' onClick={onAnchorClick}>
              <div className='flex flex-col h-full items-stretch'>
                <p
                  className={`font-manrope text-md whitespace-nowrap ${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}
                >
                  {token.symbol}
                </p>
                <p className='text-accent-color font-manrope text-sm whitespace-nowrap'>{chain.name.split(' ')[0]}</p>
              </div>
              <TokenNetworkImage tokenLogo={token.logoUri} networkLogo={chain.logoUri} />
            </div>
          ) : (
            <div className='flex flex-row gap-2 items-center' onClick={onAnchorClick}>
              <div className='w-[53px] h-[50px]'>
                <svg width='50' height='50' viewBox='0 0 64 59' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M57.6155 36.7243C58.2024 34.4136 58.5143 31.9931 58.5143 29.4998C58.5143 13.3415 45.4154 0.242676 29.2571 0.242676C13.0989 0.242676 0 13.3415 0 29.4998C0 45.6581 13.0989 58.757 29.2571 58.757C34.4339 58.757 39.2966 57.4125 43.5152 55.0536C41.9733 53.0384 41.0571 50.519 41.0571 47.7855C41.0571 41.1739 46.4169 35.8141 53.0286 35.8141C54.6535 35.8141 56.2028 36.1378 57.6155 36.7243ZM57.3501 37.698C56.0239 37.1291 54.563 36.8141 53.0286 36.8141C46.9692 36.8141 42.0571 41.7262 42.0571 47.7855C42.0571 50.3359 42.9273 52.683 44.387 54.5462C50.5858 50.7936 55.2797 44.8047 57.3501 37.698Z'
                    fill={theme === 'light' ? '#E1E1E1' : '#242424'}
                  />
                  <circle cx='53.0286' cy='47.7854' r='10.9714' fill={theme === 'light' ? '#E1E1E1' : '#242424'} />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`flex flex-row justify-start items-center h-5 pt-2 ${direction !== 'from' && 'invisible'}`}>
        <p className='text-unselected-text font-manrope text-sm'>Balance: {balance}</p>
      </div>
    </div>
  );
};
