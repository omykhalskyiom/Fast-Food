import { useState } from 'react'
import './Header.css'
import { useCart } from '../../context/CartContext'
import { useSearch } from '../../context/SearchContext'

function Header({ onCartClick }) {
  const { cartCount } = useCart()
  const { searchQuery, setSearchQuery } = useSearch()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__container">
        {/* Burger Menu Button */}
        <button 
          className={`header__burger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="header__logo">
          <span className="header__logo-icon">🍔</span>
          <span className="header__logo-text">FastFood</span>
        </div>

        {/* Desktop Search */}
        <div className="header__search header__search--desktop">
          <input
            type="text"
            className="header__search-input"
            placeholder="Пошук страв..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="header__actions">
          {/* Mobile Search Toggle */}
          <button 
            className="header__search-toggle"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            🔍
          </button>

          <div className="header__cart">
            <button className="header__cart-btn" onClick={onCartClick}>
              <span className="header__cart-icon">🛒</span>
              <span className="header__cart-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="header__search header__search--mobile">
          <div className="container">
            <input
              type="text"
              className="header__search-input"
              placeholder="Пошук страв..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="header__mobile-menu">
          <nav className="header__nav">
            <a href="#" className="header__nav-link" onClick={() => setIsMobileMenuOpen(false)}>🏠 Головна</a>
            <a href="#" className="header__nav-link" onClick={() => setIsMobileMenuOpen(false)}>📋 Меню</a>
            <a href="#" className="header__nav-link" onClick={() => setIsMobileMenuOpen(false)}>📞 Контакти</a>
            <a href="#" className="header__nav-link" onClick={() => setIsMobileMenuOpen(false)}>ℹ️ Про нас</a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
