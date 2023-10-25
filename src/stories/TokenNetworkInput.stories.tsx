import type { Meta, StoryObj } from '@storybook/react'
import { TokenNetworkInput } from '../components/TokenNetworkInput'

const meta: Meta<typeof TokenNetworkInput> = {
  component: TokenNetworkInput
}

type Story = StoryObj<typeof TokenNetworkInput>

export default meta

export const Primary: Story = {
  args: {
    direction: 'from'
  }
}

export const Selected: Story = {
  args: {
    direction: 'to',
    estimateTransferValue: "1.7",
    chain: {
      name: 'Ethereum',
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
      chainId: 1,
      isTestnet: false
    },
    token: {
      name: 'USDC',
      symbol: 'USDC',
      decimals: 6,
      chainId: 1,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
    }
  }
}
