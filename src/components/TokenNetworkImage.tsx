import React, { type FunctionComponent } from 'react'

interface TokenNetworkImageProps {
  tokenTogo?: string
  chainLogo?: string
}

const TokenNetworkImage: FunctionComponent<TokenNetworkImageProps> = ({ tokenTogo, chainLogo }) => {
  return (
    <div className="relative w-[53px] h-[50px]">
      <img src={tokenTogo} className="w-[50px] h-[50px]"/>
      <img src={chainLogo} className="w-5 h-5 absolute bottom-0 right-0" />
    </div>
  )
}

export default TokenNetworkImage
