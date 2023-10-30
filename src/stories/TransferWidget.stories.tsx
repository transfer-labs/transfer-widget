import type { Meta, StoryObj } from '@storybook/react';
import { TransferWidget } from '../components/TransferWidget';

const meta: Meta<typeof TransferWidget> = {
  component: TransferWidget,
};

type Story = StoryObj<typeof TransferWidget>;

export default meta;

export const Default: Story = {};

export const ChainTokenSelected: Story = {
  args: {
    fromChainId: 1,
    fromTokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    toChainId: 137,
    toTokenAddress: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
    amountToBeTransferred: '1',
  },
};
