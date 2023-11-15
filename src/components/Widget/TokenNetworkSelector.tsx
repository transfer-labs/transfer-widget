import React, { type FunctionComponent } from 'react';
import { DefaultTooltip } from '../Tooltip/DefaultTooltip';
import { motion } from 'framer-motion';
import { type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { type Direction } from 'models/const';

interface ChainSelectorProps {
  chains?: SupportedChain[];
  handleChainSelect: (chain: SupportedChain) => void;
  selectedChain?: SupportedChain;
}
const ChainSelector: FunctionComponent<ChainSelectorProps> = ({ chains, selectedChain, handleChainSelect }) => {
  return (
    <div className='flex flex-col w-full gap-3 bg-component-background py-3 px-2 rounded-lg border-border-color border-1'>
      <div className='flex flex-row items-center w-full gap-4 overflow-x-auto'>
        {chains?.map((chain) => {
          return (
            <div
              key={chain.chainId}
              className={`hover:cursor-pointer border-2 rounded-lg ${
                selectedChain?.chainId === chain.chainId ? 'border-success-green' : 'border-transparent'
              }`}
              onClick={() => {
                handleChainSelect(chain);
              }}
            >
              <DefaultTooltip label={chain.name} side='top'>
                <img src={chain.logoURI} className='w-12 h-12' />
              </DefaultTooltip>
            </div>
          );
        })}
      </div>
      {selectedChain !== undefined && (
        <p className='text-accent-color font-manrope font-medium text-md'>Network: {selectedChain.name}</p>
      )}
    </div>
  );
};

export interface TokenSelectorProps {
  tokens?: SupportedToken[];
  handleTokenSelect: (token: SupportedToken) => void;
  selectedToken?: SupportedToken;
}
const TokenSelector: FunctionComponent<TokenSelectorProps> = ({ tokens, selectedToken, handleTokenSelect }) => {
  return (
    <div className='flex flex-col gap-2'>
      <input
        className='bg-component-background border-1 border-border-color py-4 rounded-lg px-2 text-white placeholder-unselected-text font-Manrope'
        placeholder='Search by name or address'
      />
      <div className='flex bg-component-background rounded-lg border-1 border-border-color px-2 py-4 flex-col w-full gap-3 max-h-[300px] min-h-[300px] overflow-y-auto'>
        {tokens?.map((token) => {
          return (
            <div
              key={token.address}
              className={`flex w-full flex-row justify-between items-center hover:bg-shadow-element cursor-pointer rounded-lg border-2 ${
                selectedToken?.address === token.address ? 'border-success-green' : 'border-transparent'
              }`}
              onClick={() => {
                handleTokenSelect(token);
              }}
            >
              <div className='flex flex-row gap-1 items-center'>
                <img className='w-12 h-12' src={token.logoUri} />
                <div className='flex flex-col'>
                  <p className='text-white font-manrope text-lg'>{token.symbol}</p>
                  <p className='text-accent-color font-manrope text-md'>{token.name}</p>
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
  onClose: () => void;
}

export const TokenNetworkSelector: FunctionComponent<TokenNetworkSelectorProps> = ({
  direction,
  chains,
  tokens,
  selectedChain,
  selectedToken,
  handleChainSelect,
  handleTokenSelect,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0.25, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0.25, scale: 0.9, transition: { duration: 0.5 } }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
    >
      <div className='inline-flex flex-col py-5 px-6 gap-4 border-1 rounded-lg border-border-color bg-modal-background sm:w-[90vw] sm:min-w-[300px] max-w-[475px]'>
        <div className='flex flex-col gap-2'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
          >
            <div className='flex flex-row justify-between items-center'>
              <p className='text-white font-manrope font-medium text-xl'>
                Select {direction.charAt(0).toUpperCase() + direction.slice(1)} Network
              </p>
              <div className='p-2 hover:bg-shadow-element hover:rounded-lg cursor-pointer' onClick={onClose}>
                <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z'
                    fill='white'
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
            />
          </motion.div>
        </div>

        <div className='flex flex-col gap-2'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
          >
            <p className='text-white font-manrope font-medium text-xl'>
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
              handleTokenSelect={(token) => {
                onClose();
                handleTokenSelect(direction, token);
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
