import type { Meta, StoryObj } from '@storybook/react';

import { ActionButton } from '../components/ActionButton';

const meta: Meta<typeof ActionButton> = {
  component: ActionButton,
};

type Story = StoryObj<typeof ActionButton>;

export default meta;

export const Default: Story = {
  args: {
    label: 'Click me',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Select tokens',
    type: 'disabled',
  },
};

export const Error: Story = {
  args: {
    label: 'Error',
    type: 'error',
  },
};

export const Loading: Story = {
  args: {
    type: 'loading',
  },
};
