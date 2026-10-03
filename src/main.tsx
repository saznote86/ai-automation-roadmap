import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

// The inline loader covers the time needed to download and initialize React.
// Remove it only after the first application render is committed to the DOM.
requestAnimationFrame(() => {
  const loader = document.getElementById('initial-loader');
  if (!loader) return;

  loader.classList.add('is-ready');
  window.setTimeout(() => loader.remove(), 350);
});
