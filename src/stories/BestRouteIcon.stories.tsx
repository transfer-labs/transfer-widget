import type { Meta, StoryObj } from '@storybook/react';

import { BestRouteIcon } from '../components/Icons/BestRouteIcon';

const meta: Meta<typeof BestRouteIcon> = {
  component: BestRouteIcon,
};

type Story = StoryObj<typeof BestRouteIcon>;

export default meta;

export const Default: Story = {
  args: {},
};
