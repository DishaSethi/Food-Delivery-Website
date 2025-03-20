import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './Context/StoreContext.jsx';
import ThemeProvider from './Context/ThemeContext.jsx'; // Import ThemeProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider> {/* Wrap everything inside ThemeProvider */}
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
