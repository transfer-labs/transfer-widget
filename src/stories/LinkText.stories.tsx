import type { Meta, StoryObj } from '@storybook/react';

import { LinkText } from '../components/LinkText';

const meta: Meta<typeof LinkText> = {
  component: LinkText,
};

type Story = StoryObj<typeof LinkText>;

export default meta;

export const Default: Story = {
  args: {
    text: 'View',
    link: 'https://app.transfer.xyz',
  },
};

// export const GasError: Story = {
//   args: {
//     errorType: 'gas',
//   },
// };
