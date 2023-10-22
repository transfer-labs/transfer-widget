import type { Meta, StoryObj } from '@storybook/react'
import { TokenNetworkSelectorPage } from '../components/TokenNetworkSelectorPage'

const meta: Meta<typeof TokenNetworkSelectorPage> = {
  component: TokenNetworkSelectorPage
}

type Story = StoryObj<typeof TokenNetworkSelectorPage>

export default meta

export const Primary: Story = {
  args: {
    name: 'TokenNetworkSelectorPage'
  }
}

export const Selected: Story = {
  args: {
    name: 'TokenNetworkSelectorPage'
  }
}
