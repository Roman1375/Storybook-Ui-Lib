import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenu, type SidebarMenuProps, type MenuItem } from './';

const items1: MenuItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Profile', href: '#' },
  { label: 'Settings', href: '#' },
];

const items2: MenuItem[] = [
  {
    label: 'Catalog',
    children: [
      { label: 'Shoes', href: '#' },
      { label: 'Bags', href: '#' },
      { label: 'Accessories', href: '#' },
    ],
  },
  {
    label: 'Account',
    children: [
      { label: 'Orders', href: '#' },
      { label: 'Addresses', href: '#' },
    ],
  },
  { label: 'Help', href: '#' },
];

const meta: Meta<SidebarMenuProps> = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const OneLevel: StoryObj<SidebarMenuProps> = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <button
          style={{
            border: '2px solid #d1b9ff',
            backgroundColor: 'transparent',
            color: '#d1b9ff',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 16,
            cursor: 'pointer',
          }}
          onClick={() => setOpen(true)}
        >
          Open menu
        </button>
        <SidebarMenu open={open} onClose={() => setOpen(false)} title="Main" items={items1} />
      </div>
    );
  },
};

export const TwoLevels: StoryObj<SidebarMenuProps> = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div>
        <SidebarMenu open={open} onClose={() => setOpen(false)} title="Shop" items={items2} />
      </div>
    );
  },
};
