import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Input } from './components/input';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <main>
        <h1 className="title">React Storybook Component Library 🦅</h1>
        <Input label="Username" type="password" placeholder="Enter your username" clearable />
      </main>
    </StrictMode>,
  );
}
