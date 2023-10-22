import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import ActionButton from "../components/ActionButton";

const meta: Meta<typeof ActionButton> = {
  component: ActionButton,
};

type Story = StoryObj<typeof ActionButton>;

export default meta;

export const Default: Story = {
  args: {
    label: "Select Tokens",
    textColor: "white",
    background: "bg-component-background",
  },
};

export const Primary: Story = {
  args: {
    label: "Bridge",
    textColor: "black",
    background: "bg-success-green",
  },
};

export const Warning: Story = {
  args: {
    label: "Warning",
    textColor: "black",
    background: "bg-failure-red",
  },
};
