import type { Meta, StoryObj } from '@storybook/react';
import { TokenNetworkInput } from '../components/Widget/TokenNetworkInput';
import { SupportedChains, SupportedTokens } from '../models/dummy';

const meta: Meta<typeof TokenNetworkInput> = {
  component: TokenNetworkInput,
};

type Story = StoryObj<typeof TokenNetworkInput>;

export default meta;

export const Primary: Story = {
  args: {
    direction: 'from',
  },
};

export const SelectedTo: Story = {
  args: {
    direction: 'to',
    amount: '1.7',
    chain: SupportedChains[0],
    token: SupportedTokens[0],
  },
};

export const SelectedFrom: Story = {
  args: {
    direction: 'from',
    amount: '1.7',
    chain: SupportedChains[1],
    token: SupportedTokens[1],
  },
};
