import type { Meta, StoryObj } from '@storybook/react'
import { TransferWidget } from '../components/TransferWidget'

const meta: Meta<typeof TransferWidget> = {
  component: TransferWidget
}

type Story = StoryObj<typeof TransferWidget>

export default meta

export const Primary: Story = {
  args: {
    actionbutton: {
      label: 'Select tokens and networks',
      background: 'bg-component-background',
      textColor: 'text-unselected-text'
    },
    fromtokennetworkinput: {
      status: 'default',
      direction: 'from'
    },
    totokennetworkinput: {
      status: 'default',
      direction: 'to'
    }
  }
}

export const Selected: Story = {
  args: {
    actionbutton: {
      label: 'Review Bridge',
      background: 'bg-success-green',
      textColor: 'text-black'
    },
    fromtokennetworkinput: {
      status: 'selected',
      direction: 'from',
      value: '10',
      tokenName: 'USDC',
      chainName: 'Ethereum',
      balance: '10'
    },
    totokennetworkinput: {
      status: 'selected',
      direction: 'to',
      value: '9.95',
      tokenName: 'USDC',
      chainName: 'Polygon',
      balance: '4'
    }
  }
}
