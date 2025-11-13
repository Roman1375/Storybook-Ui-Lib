import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Input } from './components/input';
import { Toast } from './components/toast';
import './index.css';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <main>
        <h1 className="title">React Storybook Component Library 🦅</h1>
        <Input label="Input Example" type="password" placeholder="Type something" clearable />
        <Toast
          title="Hello there!"
          message="I`m a toast example!"
          type="info"
          closable={true}
          duration={5000}
        />
      </main>
    </StrictMode>,
  );
}
