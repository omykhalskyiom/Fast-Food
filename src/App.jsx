import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import ProductList from './components/ProductList/ProductList'
import Footer from './components/Footer/Footer'
import CartModal from './components/CartModal/CartModal'
import CheckoutModal from './components/CheckoutModal/CheckoutModal'

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
    <>
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
    </>
  )
}

export default App
