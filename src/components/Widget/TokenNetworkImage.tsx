import React, { FunctionComponent } from 'react';

interface TokenNetworkImageProps {
  logo?: string;
  networkLogo?: string;
}

const TokenNetworkImage: FunctionComponent<TokenNetworkImageProps> = ({ logo, networkLogo }) => {
  return (
    <div className="relative w-[53px] h-[50px]">
      <img src={logo} className="w-[50px] h-[50px]"/>
      <img src={networkLogo} className="w-5 h-5 absolute bottom-0 right-0" />
    </div>
  );
};

export default TokenNetworkImage;