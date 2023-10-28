import type { Meta, StoryObj } from '@storybook/react';
import { TokenNetworkSelector } from '../components/widget/TokenNetworkSelector';
import { SupportedChains, SupportedTokens } from '../models/dummy';

const meta: Meta<typeof TokenNetworkSelector> = {
  component: TokenNetworkSelector,
};

type Story = StoryObj<typeof TokenNetworkSelector>;

export default meta;

export const Ethereum: Story = {
  args: {
    direction: 'from',
    chains: SupportedChains,
    tokens: SupportedTokens,
    selectedChain: SupportedChains[0],
    selectedToken: SupportedTokens[0],
  },
};
