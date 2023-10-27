import type { Meta, StoryObj } from '@storybook/react'
import { TransferWidget } from '../components/Widget/TransferWidget'
//example token and network
import Token from '../../src/icons/network-token-examples/USDC.png'
import fromNetwork from '../../src/icons/network-token-examples/from-chain.png';
import toNetwork from '../../src/icons/network-token-examples/to-chain.png';
import Bridge from '../icons/Routes/stargate.png';

import { From } from './TokenNetworkSelector.stories'

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
      disabled: true,
    },
    fromtokennetworkinput: {
      status: defaultStatus,
      direction: 'from'
    },
    totokennetworkinput: {
      status: defaultStatus,
      direction: 'to'
    },
    tokennetworkselector:
    {
      direction: 'from',
      network: {
        network: 'ethereum',
        chainName: 'ethereum',
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
            network: 'ethereum',
            chainName: 'Ethereum',
            networkLogo: fromNetwork,
        }
    }
    },
    routes: {
      status: 'default',
    }
  }
}

const defaultNetwork = 'ethereum'

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


export const Selected: Story = {
  args: {
    actionbutton: {
      label: 'Review Bridge',
      background: 'bg-success-green',
      textColor: 'text-black',
      hover: 'hover:bg-hover-green',
      disabled: false
    },
    fromtokennetworkinput: {
      status: 'selected',
      direction: 'from',
      value: '10',
      supportedtokensprops: {
        token: fromTokenProps,
        network: fromTokenNetworkProps
      }
    },
    totokennetworkinput: {
      status: 'selected',
      direction: 'to',
      value: '9.95',
      supportedtokensprops: {
        token: toTokenProps,
        network: toTokenNetworkProps
      }
    },
    tokennetworkselector:
    {
      direction: 'to',
      network: toTokenNetworkProps,
      tokens: {
        token: toTokenProps,
        network: toTokenNetworkProps,
    }
    },
    routes : {
      status: 'selected',
      routeprops: RouteProps
    }
  }
}



export const GasError: Story = {
  args: {
    actionbutton: {
      label: 'Error',
      background: 'bg-failure-red',
      textColor: 'text-black',
      hover: 'hover:bg-hover-red',
      disabled: true,
    },
    fromtokennetworkinput: {
      status: 'selected',
      direction: 'from',
      value: '10',
      supportedtokensprops: {
        token: fromTokenProps,
        network: fromTokenNetworkProps
      }
    },
    totokennetworkinput: {
      status: 'selected',
      direction: 'to',
      value: '9.95',
      supportedtokensprops: {
        token: toTokenProps,
        network: toTokenNetworkProps
      }
    },
    tokennetworkselector:
    {
      direction: 'to',
      network: toTokenNetworkProps,
      tokens: {
        token: toTokenProps,
        network: toTokenNetworkProps,
    }
    },
    routes : {
      status: 'gas-error',
      routeprops: {
        status: 'gas-error',
        type: 'Bridge',
        bridge: 'Stargate',
        bridgeLogo: Bridge,
        routetokenprops: RouteProps.routetokenprops,
        details: RouteDetailProps,
        },
      },
    gaserror: {
      label: "Need ETH for Gas Fees to make successful transaction."
    }
  }
}

export const RouteError: Story = {
  args: {
    actionbutton: {
      label: 'Error',
      background: 'bg-failure-red',
      textColor: 'text-black',
      hover: 'hover:bg-hover-red',
      disabled: true,
    },
    fromtokennetworkinput: {
      status: 'selected',
      direction: 'from',
      value: '10',
      supportedtokensprops: {
        token: fromTokenProps,
        network: fromTokenNetworkProps
      }
    },
    totokennetworkinput: {
      status: 'selected',
      direction: 'to',
      value: '9.95',
      supportedtokensprops: {
        token: toTokenProps,
        network: toTokenNetworkProps
      }
    },
    routes : {
      status: 'error',
      routeprops: {
        status: 'error',
        type: 'Bridge',
        bridge: 'Stargate',
        bridgeLogo: Bridge,
        routetokenprops: RouteProps.routetokenprops,
        details: RouteDetailProps,
        },
      },
  }
}