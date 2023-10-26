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


export const Ethereum: Story = {
  args: {
    direction: 'from',
    network: {
        network: defaultNetwork,
        chainName: 'Ethereum',
        networkLogo: fromNetwork,
    },
    tokens: {
        token: {
            tokenName: 'USDC',
            tokenDescription: 'US Dollar Coin',
            tokenLogo: Token,
            balance: '11'
        },
        network: {
            network: defaultNetwork,
            chainName: 'Ethereum',
            networkLogo: fromNetwork,
        }
    }
  }
}
