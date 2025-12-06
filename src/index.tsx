import React from 'react';
import ReactDOM from 'react-dom/client';
// Import ko simple rakhte hain taake build system ko file dhoondhne mein aasani ho.
// .tsx extension hata diya gaya hai.
import App from './App'; 

// Yeh function DOM element ko dhoondhta hai jahaan React app attach hoga
const rootElement = document.getElementById('root');

if (!rootElement) {
  // Agar 'root' ID wala element nahi milta to error dein
  throw new Error("React app attach karne ke liye 'root' element nahi mila.");
}

// React application ka root create karein
const root = ReactDOM.createRoot(rootElement);

// App component ko DOM mein render karein
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
