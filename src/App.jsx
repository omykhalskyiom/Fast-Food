import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import ProductList from './components/ProductList/ProductList'
import Footer from './components/Footer/Footer'
import CartModal from './components/CartModal/CartModal'
import CheckoutModal from './components/CheckoutModal/CheckoutModal'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import './components/ErrorBoundary/ErrorBoundary.css'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleCartOpen = () => setIsCartOpen(true)
  const handleCartClose = () => setIsCartOpen(false)

  const handleCheckoutOpen = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }
  const handleCheckoutClose = () => setIsCheckoutOpen(false)

  return (
    <ErrorBoundary>
      <Header onCartClick={handleCartOpen} />
      <Categories />
      <main className="main">
        <ProductList />
      </main>
      <Footer />

      <CartModal
        isOpen={isCartOpen}
        onClose={handleCartClose}
        onCheckout={handleCheckoutOpen}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCheckoutClose}
      />
      <ScrollToTop />
    </ErrorBoundary>
  )
}

export default App
