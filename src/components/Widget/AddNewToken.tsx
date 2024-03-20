import React, { type FunctionComponent } from 'react';
import { type SupportedToken } from '@argoplatform/transfer-sdk';
import { type WidgetTheme } from '../../models/const';
import { useTokenUtils } from '../../hooks/useTokenUtils';

export interface TokenSelectorProps {
  handleTokenSelect: (token: SupportedToken) => void;
  theme?: WidgetTheme;
  search: string;
  chainId: number;
}
export const AddNewToken: FunctionComponent<TokenSelectorProps> = ({ handleTokenSelect, theme, search, chainId }) => {
  const { shortenAddress } = useTokenUtils();
  const tokenThemeClass = `flex w-full flex-row justify-between items-center p-1 hover:bg-shadow-element-${
    theme === 'light' ? 'light' : 'dark'
  } cursor-pointer rounded-lg`;

  return (
    <div
      className={tokenThemeClass}
      onClick={() => {
        handleTokenSelect({
          chain_id: chainId,
          address: search,
          decimals: 18,
          symbol: shortenAddress(search, 2),
          name: 'Unknown token',
        });
      }}
    >
      <div className='flex flex-row gap-4 items-center w-full'>
        <div className='rounded-full bg-zinc-700 w-6 h-6'></div>
        <p className={`font-manrope text-base ${theme === 'light' ? 'text-black' : 'text-white'}`}>Add token</p>
      </div>
    </div>
  );
};
