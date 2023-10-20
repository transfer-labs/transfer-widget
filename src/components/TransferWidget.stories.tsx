import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import TransferWidget from "./ActionButton";


const meta: Meta<typeof TransferWidget> = {
    component: TransferWidget
}

type Story = StoryObj<typeof TransferWidget>;

export default meta;

export const Primary: Story = {
    args: {
        label: "Bridge",
        background: "bg-success-green",
        textColor: 'text-black',
      }
  };

export const Default: Story = {
    args: {
        label:'Select Tokens',
        background: "bg-component-background",
        textColor: 'text-white',
    }
}