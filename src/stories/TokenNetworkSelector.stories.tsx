import type { Meta, StoryObj } from '@storybook/react'
import TokenNetworkSelector from '../components/Widget/TokenNetworkSelector'

//example token and network
import Token from '../../src/icons/network-token-examples/USDC.png'
import fromNetwork from '../../src/icons/network-token-examples/from-chain.png';
import toNetwork from '../../src/icons/network-token-examples/to-chain.png';
import Bridge from '../icons/Routes/stargate.png';

const meta: Meta<typeof TokenNetworkSelector> = {
  component: TokenNetworkSelector
}

type Story = StoryObj<typeof TokenNetworkSelector>

export default meta
const defaultNetwork = 'ethereum'


const fromTokenProps = {
    tokenName: 'USDC',
    tokenDescription: 'US Dollar Coin',
    tokenLogo: Token,
    balance: 11,
    price: 1,
  }
  
  const fromNetworkProps= {
    network: "ethereum" as "ethereum" | "polygon" | "arbitrum" | "optimism" | "goerli" | "mumbai",
    chainName: 'Ethereum',
    networkLogo: fromNetwork,
  }

export const From: Story = {
  args: {
    direction: 'from',
    network: fromNetworkProps,
    tokens: {
        token: fromTokenProps,
        network: fromNetworkProps
    }
  }
}

const toTokenProps = {
    tokenName: 'USDC',
    tokenDescription: 'US Dollar Coin',
    tokenLogo: Token,
    balance: 11,
    price: 1,
  
  }
  
  const toNetworkProps = {
    network: "polygon" as "ethereum" | "polygon" | "arbitrum" | "optimism" | "goerli" | "mumbai",
    chainName: 'Polygon',
    networkLogo: toNetwork,
  }


export const To: Story = {
    args: {
      direction: 'to',
      network: toNetworkProps,
      tokens: {
          token: toTokenProps,
          network: toNetworkProps
      }
    }
  }
