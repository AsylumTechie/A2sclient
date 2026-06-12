import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';

const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

createRoot(document.getElementById('root')).render(
  import.meta.env.DEV ? <StrictMode>{app}</StrictMode> : app,
);
