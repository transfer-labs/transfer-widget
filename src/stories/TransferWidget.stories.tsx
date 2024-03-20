import type { Meta, StoryObj } from '@storybook/react';
import { TWMock } from './TWMock';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
declare global {
  interface Window {
    ethereum?: any;
  }
}
const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

const meta: Meta<typeof TWMock> = {
  component: TWMock,
};

type Story = StoryObj<typeof TWMock>;

export default meta;

export const Default: Story = {
  args: {
    isTestnet: true,
    userAddress: '0x968961A3A78bCeb7F91323054eCB332b19887fBf',
  },
};

export const BridgeSelected: Story = {
  args: {
    fromChainId: 5,
    fromTokenAddress: '0xDf0360Ad8C5ccf25095Aa97ee5F2785c8d848620',
    toChainId: 80001,
    toTokenAddress: '0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7',
    amountToBeTransferred: '1',
    isTestnet: true,
    userAddress: '0x968961A3A78bCeb7F91323054eCB332b19887fBf',
    walletClient: client,
  },
};

export const SwapSelected: Story = {
  args: {
    fromChainId: 5,
    fromTokenAddress: '0xDf0360Ad8C5ccf25095Aa97ee5F2785c8d848620',
    toChainId: 5,
    toTokenAddress: '0x0000000000000000000000000000000000000000',
    amountToBeTransferred: '1',
    isTestnet: true,
    userAddress: '0x968961A3A78bCeb7F91323054eCB332b19887fBf',
    walletClient: client,
  },
};
