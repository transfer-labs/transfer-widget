import React from "react";
import TextButton from "../components/TextButton";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Button",
  component: TextButton,
} as Meta<typeof TextButton>;

const Template: StoryFn<typeof TextButton> = (args) => <TextButton {...args} />;

export const Submit = Template.bind({});
Submit.args = {
  label: "Button",
};

export const Check = Template.bind({});
Check.args = {
  label: "Button",
};
