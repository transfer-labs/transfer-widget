import type { Meta, StoryObj } from '@storybook/react'
import { TransferWidgetContainer } from '../components/TransferWidgetContainer'
// example token and network
import Token from '../icons/network-token-examples/USDC.png'
import fromNetwork from '../icons/network-token-examples/from-chain.png'
import toNetwork from '../icons/network-token-examples/to-chain.png'
import Bridge from '../icons/routes/stargate.png'

const meta: Meta<typeof TransferWidgetContainer> = {
  component: TransferWidgetContainer
}

type Story = StoryObj<typeof TransferWidgetContainer>

export default meta
const defaultStatus = 'default'

export const Primary: Story = {
  args: {
    actionbutton: {
      label: 'Select tokens and networks',
      type: 'disabled'
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
      status: 'default'
    }
  }
}

export const Selected: Story = {
  args: {
    actionbutton: {
      label: 'Review Bridge',
    },
    fromTokenNetworkProps: {
      status: 'selected',
      direction: 'from',
      value: '10',
      tokenName: 'USDC',
      chainName: 'Ethereum',
      tokenLogo: Token,
      tokenNetwork: fromNetwork,
      balance: '10'
    },
    toTokenNetworkProps: {
      status: 'selected',
      direction: 'to',
      value: '9.95',
      tokenName: 'USDC',
      chainName: 'Polygon',
      tokenLogo: Token,
      tokenNetwork: toNetwork,
      balance: '4'
    },
    routes: {
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
          steps: 1
        }
      }
    }
  }
}

export const GasError: Story = {
  args: {
    actionbutton: {
      label: 'Error',
      type: 'error'
    },
    fromTokenNetworkProps: {
      status: 'selected',
      direction: 'from',
      value: '10',
      tokenName: 'USDC',
      chainName: 'Ethereum',
      tokenLogo: Token,
      tokenNetwork: fromNetwork,
      balance: '10'
    },
    toTokenNetworkProps: {
      status: 'selected',
      direction: 'to',
      value: '9.95',
      tokenName: 'USDC',
      chainName: 'Polygon',
      tokenLogo: Token,
      tokenNetwork: toNetwork,
      balance: '4'
    },
    routes: {
      status: 'gas-error',
      routeprops: {
        status: 'gas-error',
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
          steps: 1
        }
      }
    },
    gaserror: {
      label: 'Need ETH for Gas Fees to make successful transaction.'
    }
  }
}

export const RouteError: Story = {
  args: {
    actionbutton: {
      label: 'Error',
      type: 'error'
    },
    fromTokenNetworkProps: {
      status: 'selected',
      direction: 'from',
      value: '10',
      tokenName: 'USDC',
      chainName: 'Ethereum',
      tokenLogo: Token,
      tokenNetwork: fromNetwork,
      balance: '10'
    },
    toTokenNetworkProps: {
      status: 'selected',
      direction: 'to',
      value: '9.95',
      tokenName: 'USDC',
      chainName: 'Polygon',
      tokenLogo: Token,
      tokenNetwork: toNetwork,
      balance: '4'
    },
    routes: {
      status: 'error',
      routeprops: {
        status: 'error',
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
          steps: 1
        }
      }
    },
    gaserror: {
      label: 'Need ETH for Gas Fees to make successful transaction.'
    }
  }
}
