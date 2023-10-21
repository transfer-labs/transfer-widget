import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import TransferWidget from "./TransferWidget";


const meta: Meta<typeof TransferWidget> = {
    component: TransferWidget
}

type Story = StoryObj<typeof TransferWidget>;

export default meta;

export const Primary: Story = {
    args: {
        actionbutton:{
            label: "Select tokens and networks",
            background: "bg-component-background",
            textColor: 'text-unselected-text',
            }
      }
  };

export const Default: Story = {
    // args: {
    //     label:'Select Tokens',
    //     background: "bg-component-black",
    //     textColor: 'text-white',
    // }
}