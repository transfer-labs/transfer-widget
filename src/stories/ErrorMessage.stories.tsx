import type { Meta, StoryObj } from '@storybook/react';

import { ErrorMessage } from '../components/errors/ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
  component: ErrorMessage,
};

type Story = StoryObj<typeof ErrorMessage>;

export default meta;

export const Default: Story = {
  args: {
    label: 'Something went wrong',
  },
};

export const GasError: Story = {
  args: {
    label: "You don't have enough gas",
    type: 'gas',
  },
};
