import type { Meta, StoryObj } from '@storybook/react';
import { TransferWidget } from '../components/TransferWidget';
// example token and network
import Token from '../../src/icons/network-token-examples/USDC.png';
import fromNetwork from '../../src/icons/network-token-examples/from-chain.png';
import toNetwork from '../../src/icons/network-token-examples/to-chain.png';
import Bridge from '../icons/routes/stargate.png';

const meta: Meta<typeof TransferWidget> = {
  component: TransferWidget,
};

type Story = StoryObj<typeof TransferWidget>;

export default meta;
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
      direction: 'from',
    },
    totokennetworkinput: {
      status: defaultStatus,
      direction: 'to',
    },
    tokennetworkselector: {
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
          balance: '11',
        },
        network: {
          network: 'ethereum',
          chainName: 'Ethereum',
          networkLogo: fromNetwork,
        },
      },
    },
    routes: {
      status: 'default',
    },
  },
};

const defaultNetwork = 'ethereum';

export const Selected: Story = {
  args: {
    actionbutton: {
      label: 'Review Bridge',
      background: 'bg-success-green',
      textColor: 'text-black',
      hover: 'hover:bg-hover-green',
      disabled: false,
    },
    fromtokennetworkinput: {
      status: 'selected',
      direction: 'from',
      value: '10',
      tokenName: 'USDC',
      chainName: 'Ethereum',
      tokenLogo: Token,
      tokenNetwork: fromNetwork,
      balance: '10',
    },
    totokennetworkinput: {
      status: 'selected',
      direction: 'to',
      value: '9.95',
      tokenName: 'USDC',
      chainName: 'Polygon',
      tokenLogo: Token,
      tokenNetwork: toNetwork,
      balance: '4',
    },
    tokennetworkselector: {
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
          balance: '11',
        },
        network: {
          network: 'ethereum',
          chainName: 'Ethereum',
          networkLogo: fromNetwork,
        },
      },
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
          steps: 1,
        },
      },
    },
  },
};

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
      tokenName: 'USDC',
      chainName: 'Ethereum',
      tokenLogo: Token,
      tokenNetwork: fromNetwork,
      balance: '10',
    },
    totokennetworkinput: {
      status: 'selected',
      direction: 'to',
      value: '9.95',
      tokenName: 'USDC',
      chainName: 'Polygon',
      tokenLogo: Token,
      tokenNetwork: toNetwork,
      balance: '4',
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
          steps: 1,
        },
      },
    },
    gaserror: {
      label: 'Need ETH for Gas Fees to make successful transaction.',
    },
  },
};

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
      tokenName: 'USDC',
      chainName: 'Ethereum',
      tokenLogo: Token,
      tokenNetwork: fromNetwork,
      balance: '10',
    },
    totokennetworkinput: {
      status: 'selected',
      direction: 'to',
      value: '9.95',
      tokenName: 'USDC',
      chainName: 'Polygon',
      tokenLogo: Token,
      tokenNetwork: toNetwork,
      balance: '4',
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
          steps: 1,
        },
      },
    },
    gaserror: {
      label: 'Need ETH for Gas Fees to make successful transaction.',
    },
  },
};
