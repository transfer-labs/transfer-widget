import React, { type FunctionComponent } from 'react';
import { DefaultTooltip } from '../Tooltip/DefaultTooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { type Direction, type WidgetTheme } from '../../models/const';
import { useTokenUtils } from '../../hooks/useTokenUtils';

interface ChainSelectorProps {
  chains?: SupportedChain[];
  handleChainSelect: (chain: SupportedChain) => void;
  selectedChain?: SupportedChain;
  theme: WidgetTheme;
}
const ChainSelector: FunctionComponent<ChainSelectorProps> = ({ chains, selectedChain, handleChainSelect, theme }) => {
  const themeClass =
    theme === 'light'
      ? 'bg-component-background-light border-border-color-light text-black'
      : 'bg-component-background-dark border-border-color-dark text-white';
  return (
    <div className={`flex flex-col w-full gap-3 ${themeClass} py-3 px-2 rounded-lg border-1`}>
      <div className='flex flex-row items-center w-full gap-4 overflow-x-auto'>
        {chains?.map((chain) => {
          const chainThemeClass =
            selectedChain?.chain_id === chain.chain_id ? 'border-success-green' : 'border-transparent';
          return (
            <div
              key={chain.chain_id}
              className={`hover:cursor-pointer border-2 rounded-lg ${chainThemeClass}`}
              onClick={() => {
                handleChainSelect(chain);
              }}
            >
              <DefaultTooltip label={chain.name} side='top'>
                <img src={chain.logo_uri} className='w-12 h-12' />
              </DefaultTooltip>
            </div>
          );
        })}
      </div>
      {selectedChain !== undefined && (
        <p className={`text-accent-color font-manrope font-medium text-md ${themeClass}`}>
          Network: {selectedChain.name}
        </p>
      )}
    </div>
  );
};

export interface TokenSelectorProps {
  tokens?: SupportedToken[];
  handleTokenSelect: (token: SupportedToken) => void;
  selectedToken?: SupportedToken;
  theme?: WidgetTheme;
}
const TokenSelector: FunctionComponent<TokenSelectorProps> = ({ tokens, selectedToken, handleTokenSelect, theme }) => {
  const [search, setSearch] = React.useState<string>('');
  const { shortenAddress, isNullAddress } = useTokenUtils();
  // const themeClass =
  //   theme === 'light'
  //     ? 'bg-component-background-light border-border-color-light text-black'
  //     : 'bg-component-background-dark border-border-color-dark text-white';
  const inputThemeClass = `bg-component-background-${
    theme === 'light' ? 'light' : 'dark'
  } border-1 border-border-color-${theme === 'light' ? 'light' : 'dark'} py-4 rounded-lg px-2 ${
    theme === 'light' ? 'text-black' : 'text-white'
  } placeholder-unselected-text font-manrope`;
  const tokenListThemeClass = `flex bg-component-background-${
    theme === 'light' ? 'light' : 'dark'
  } rounded-lg border-1 border-border-color-${
    theme === 'light' ? 'light' : 'dark'
  } px-2 py-4 flex-col w-full gap-3 max-h-[300px] min-h-[300px] overflow-y-auto`;
  return (
    <div className='flex flex-col gap-2'>
      <input
        className={inputThemeClass}
        placeholder='Search by name or address'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className={tokenListThemeClass}>
        {tokens
          ?.filter((token) => {
            const _search = search.trim().toLowerCase();
            return (
              token.name.toLowerCase().includes(_search) ||
              token.address.toLowerCase().includes(_search) ||
              token.symbol.toLowerCase().includes(_search)
            );
          })
          .map((token) => {
            const tokenThemeClass = `flex w-full flex-row justify-between items-center hover:bg-shadow-element-${
              theme === 'light' ? 'light' : 'dark'
            } cursor-pointer rounded-lg border-2 ${
              selectedToken?.address === token.address ? 'border-success-green' : 'border-transparent'
            }`;
            return (
              <div
                key={token.address}
                className={tokenThemeClass}
                onClick={() => {
                  handleTokenSelect(token);
                }}
              >
                <div className='flex flex-row gap-1 items-center'>
                  <img className='w-12 h-12' src={token.logo_uri} />
                  <div className='flex flex-col'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className={`font-manrope text-lg ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        {token.symbol}
                      </p>
                      <p className={`text-accent-color font-manrope text-sm truncate`}>({token.name})</p>
                    </div>
                    {!isNullAddress(token.address) && (
                      <p className={`text-accent-color font-manrope text-sm`}>{shortenAddress(token.address)}</p>
                    )}
                  </div>
                </div>
                {/* <p className='text-accent-color font-manrope text-md'>*balance*</p> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export interface TokenNetworkSelectorProps {
  direction: Direction;
  chains?: SupportedChain[];
  tokens?: SupportedToken[];
  selectedChain?: SupportedChain;
  selectedToken?: SupportedToken;
  handleChainSelect: (direction: Direction, chain?: SupportedChain) => void;
  handleTokenSelect: (direction: Direction, token?: SupportedToken) => void;
  autoSize: boolean;
  theme: WidgetTheme;
  onClose: () => void;
}

export const TokenNetworkSelector: FunctionComponent<TokenNetworkSelectorProps> = ({
  direction,
  chains,
  tokens,
  selectedChain,
  selectedToken,
  autoSize,
  handleChainSelect,
  handleTokenSelect,
  onClose,
  theme,
}) => {
  const themeClass = theme === 'light' ? 'text-black' : 'text-white';
  const closeButtonThemeClass = `p-2 ${
    theme === 'light' ? 'hover:bg-shadow-element-light' : 'hover:bg-shadow-element-dark'
  } hover:rounded-lg cursor-pointer ${themeClass}`;
  return (
    <div className='w-full'>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0.25, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.25, scale: 0.9, transition: { duration: 0.5 } }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
        >
          <div className='flex flex-col gap-2'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            >
              <div className='flex flex-row justify-between items-center'>
                <p className={`font-manrope font-medium text-xl ${themeClass}`}>
                  Select {direction.charAt(0).toUpperCase() + direction.slice(1)} Network
                </p>
                <div className={closeButtonThemeClass} onClick={onClose}>
                  <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z'
                      fill={theme === 'light' ? 'black' : 'white'}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
            >
              <ChainSelector
                chains={chains}
                selectedChain={selectedChain}
                handleChainSelect={(chain) => {
                  handleTokenSelect(direction, undefined);
                  handleChainSelect(direction, chain);
                }}
                theme={theme}
              />
            </motion.div>
          </div>

          <div className='flex flex-col gap-2'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            >
              <p className={`font-manrope font-medium text-xl ${themeClass}`}>
                Select {direction.charAt(0).toUpperCase() + direction.slice(1)} Token
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
            >
              <TokenSelector
                tokens={tokens}
                selectedToken={selectedToken}
                theme={theme}
                handleTokenSelect={(token) => {
                  onClose();
                  handleTokenSelect(direction, token);
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
