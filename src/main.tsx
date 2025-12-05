import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure the root element exists before rendering the app
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount the React app");
}

ReactDOM.createRoot(rootElement).render(
  // StrictMode helps in catching potential problems in an application
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
