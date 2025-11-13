import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: { control: 'select', options: ['text', 'password', 'number', 'email', 'tel'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Type something here…',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const WithLabel: Story = {
  args: { label: 'Email' },
};

export const PasswordWithToggle: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    clearable: true,
  },
};

export const Number: Story = {
  args: { label: 'Number', clearable: true, type: 'number' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
