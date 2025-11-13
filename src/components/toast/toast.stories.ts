import type { Meta, StoryObj } from '@storybook/react';
import { Toast, type ToastProps } from './';

const meta: Meta<ToastProps> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    duration: { control: { type: 'number', min: 0, step: 500 } },
    closable: { control: 'boolean' },
    title: { control: 'text' },
    message: { control: 'text' },
  },
  args: {
    type: 'info',
    title: 'Just info',
    message: 'Your changes have been saved.',
    duration: 3000,
    closable: false,
    open: true,
  },
} satisfies Meta<ToastProps>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Success: Story = { args: { type: 'success', title: 'Congratulations' } };
export const Warning: Story = { args: { type: 'warning', title: 'Heads up' } };
export const Error: Story = {
  args: {
    type: 'error',
    title: 'Oh no',
    message: 'Your changes haven`t been saved',
    duration: 10000,
  },
};
export const Closable: Story = {
  args: {
    closable: true,
    duration: 0,
    title: 'Closable Toast',
    message: 'You can only close me manually',
  },
};
