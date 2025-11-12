import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'Type something here…',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Email' },
};

export const PasswordInput: Story = {
  args: { label: 'Password', type: 'password' },
};

export const ClearableInput: Story = {
  args: { label: 'Search', clearable: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
