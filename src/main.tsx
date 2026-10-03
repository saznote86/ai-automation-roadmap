import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { I18nProvider } from './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <I18nProvider>
    <App />
  </I18nProvider>
);

// The inline loader covers the time needed to download and initialize React.
// Remove it only after the first application render is committed to the DOM.
requestAnimationFrame(() => {
  const loader = document.getElementById('initial-loader');
  if (!loader) return;

  loader.classList.add('is-ready');
  window.setTimeout(() => loader.remove(), 350);
});
