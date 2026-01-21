
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Constructing the URL explicitly to ensure it matches the current origin
    // in sandboxed or proxied environments.
    const swUrl = new URL('./sw.js', window.location.href).href;
    
    navigator.serviceWorker.register(swUrl)
      .then((registration) => {
        console.log('ServiceWorker registered with scope:', registration.scope);
      })
      .catch((err) => {
        // In some development sandboxes, Service Workers are restricted.
        // We log it as a warning rather than a full error to avoid cluttering the UI.
        console.warn('ServiceWorker registration skipped or failed. This is expected in some development environments.', err);
      });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
