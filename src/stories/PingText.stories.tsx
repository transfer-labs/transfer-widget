import type { Meta, StoryObj } from '@storybook/react';

import { PingText } from '../components/PingText';

const meta: Meta<typeof PingText> = {
  component: PingText,
};

type Story = StoryObj<typeof PingText>;

export default meta;

export const Default: Story = {
  args: {},
};

// export const GasError: Story = {
//   args: {
//     errorType: 'gas',
//   },
// };
