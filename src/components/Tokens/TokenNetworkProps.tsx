
//props for supported networks and tokens
export interface SupportedNetworkProps {
    network: 'ethereum' | 'polygon' | 'arbitrum' | 'optimism' | 'goerli' | 'mumbai' // chain id / name
    chainName: string // The chain name 
    networkLogo?: string // The network logo
}


export interface SupportedTokenProps {
    tokenName?: string // The token name (like USDC)
    tokenDescription?: string // the token description (like US Dollar Coin)
    tokenLogo?: string // the token logo
    balance?: number // Balance of the token
    price?: number // price of the token
}

export interface SupportedTokensProps {
    network: SupportedNetworkProps //network interface (network id, name, logo)
    token: SupportedTokenProps //token interface (USDC, USDollarCoin, Logo, Balance)
}
