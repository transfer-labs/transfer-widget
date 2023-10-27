import type { Meta, StoryObj } from '@storybook/react'
import ReviewRoutes from '../components/Widget/ReviewRoute'

//example token and network
import Token from '../../src/icons/network-token-examples/USDC.png'
import fromNetwork from '../../src/icons/network-token-examples/from-chain.png';
import toNetwork from '../../src/icons/network-token-examples/to-chain.png';
import Bridge from '../icons/Routes/stargate.png';

const meta: Meta<typeof ReviewRoutes> = {
  component: ReviewRoutes
}

type Story = StoryObj<typeof ReviewRoutes>

export default meta

const fromTokenProps = {
    tokenName: 'USDC',
    tokenDescription: 'US Dollar Coin',
    tokenLogo: Token,
    balance: 11,
    price: 1,
  }
  
  const fromTokenNetworkProps= {
    network: "ethereum" as "ethereum" | "polygon" | "arbitrum" | "optimism" | "goerli" | "mumbai",
    chainName: 'Ethereum',
    networkLogo: fromNetwork,
  }
  
  const toTokenProps = {
    tokenName: 'USDC',
    tokenDescription: 'US Dollar Coin',
    tokenLogo: Token,
    balance: 11,
    price: 1,
  
  }
  
  const toTokenNetworkProps = {
    network: "polygon" as "ethereum" | "polygon" | "arbitrum" | "optimism" | "goerli" | "mumbai",
    chainName: 'Polygon',
    networkLogo: toNetwork,
  }
  
  const RouteDetailProps = {
    gas: '.073',
    fees: '.50',
    time: '5:00',
    steps: 1,
  }
  
  const RouteProps= {
    status: 'default' as 'default' | 'selected' | 'error' | 'gas-error',
    type: 'Bridge' as 'Bridge' | 'Bridge and Swap' | 'Swap' | 'Swap and Bridge',
    bridge: 'Stargate',
    bridgeLogo: Bridge,
    routetokenprops: {
      fromTokenProps: { 
        SupportedTokensProps: {
          fromToken: fromTokenProps,
          fromNetwork: fromTokenNetworkProps,
        }
      },
      toTokenProps: {
        SupportedTokensProps: {
          toToken: toTokenProps,
          toNetwork: toTokenNetworkProps,
        }
      }
    },
    details: RouteDetailProps
  }


export const Primary: Story = {
  args: {
    routeprops: RouteProps,
    actionbutton: {
        label: 'Bridge',
        background: 'bg-success-green',
        textColor: 'text-black',
        hover: 'hover:bg-hover-green',
        disabled: false
    },
    }
}
