import type { Meta, StoryObj } from '@storybook/react'
import { TransferWidget } from '../components/TransferWidget'
//example token and network
import Token from '../../src/icons/network-token-examples/USDC.png'
import fromNetwork from '../../src/icons/network-token-examples/from-chain.png';
import toNetwork from '../../src/icons/network-token-examples/to-chain.png';
import Bridge from '../icons/Routes/stargate.png';

const meta: Meta<typeof TransferWidget> = {
  component: TransferWidget
}

type Story = StoryObj<typeof TransferWidget>

export default meta
const defaultStatus = 'default';

export const Primary: Story = {
  args: {
    actionbutton: {
      label: 'Select tokens and networks',
      background: 'bg-component-background',
      textColor: 'text-unselected-text',
      hover: null,
    },
    fromtokennetworkinput: {
      status: defaultStatus,
      direction: 'from'
    },
    totokennetworkinput: {
      status: defaultStatus,
      direction: 'to'
    },
    routes: {
      status: 'default',
    }
  }
}

export const Selected: Story = {
  args: {
    actionbutton: {
      label: 'Review Bridge',
      background: 'bg-success-green',
      textColor: 'text-black',
      hover: 'hover:bg-hover-green',
    },
    fromtokennetworkinput: {
      status: 'selected',
      direction: 'from',
      value: '10',
      tokenName: 'USDC',
      chainName: 'Ethereum',
      tokenLogo: Token,
      tokenNetwork: fromNetwork,
      balance: '10'
    },
    totokennetworkinput: {
      status: 'selected',
      direction: 'to',
      value: '9.95',
      tokenName: 'USDC',
      chainName: 'Polygon',
      tokenLogo: Token,
      tokenNetwork: toNetwork,
      balance: '4'
    },
    routes : {
      status: 'selected',
      routeprops: {
        status: defaultStatus,
        direction: 'from',
        value: '10',
        type: 'Bridge',
        bridge: 'Stargate',
        bridgeLogo: Bridge,
        tokenName: 'USDC',
        chainName: 'Ethereum',
        tokenLogo: Token,
        tokenNetwork: fromNetwork,
        balance: '10',
        details: {
          gas: '.073',
          fees: '.50',
          time: '5:00',
          steps: 1,
        }
      }
    }
  }
}
