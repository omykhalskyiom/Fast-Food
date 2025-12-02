import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/Toast/Toast.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { CategoryProvider } from './context/CategoryContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <CartProvider>
        <CategoryProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </CategoryProvider>
      </CartProvider>
    </ToastProvider>
  </StrictMode>,
)
