import type { Meta, StoryObj } from '@storybook/react';
import { RouteContainer } from '../components/Routes/RouteContainer';
const meta: Meta<typeof RouteContainer> = {
  component: RouteContainer,
};

type Story = StoryObj<typeof RouteContainer>;

export default meta;

export const Primary: Story = {
  args: {},
};
