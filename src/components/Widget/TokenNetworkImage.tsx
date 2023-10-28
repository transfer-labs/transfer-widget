import React, { type FunctionComponent } from 'react';

interface TokenNetworkImageProps {
  tokenLogo?: string;
  networkLogo?: string;
}

export const TokenNetworkImage: FunctionComponent<TokenNetworkImageProps> = ({ tokenLogo, networkLogo }) => {
  return (
    <div className='relative w-[53px] h-[50px]'>
      <img src={tokenLogo} className='w-[50px] h-[50px]' />
      <img src={networkLogo} className='w-5 h-5 absolute bottom-0 right-0' />
    </div>
  );
};
