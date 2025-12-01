import './Header.css'
import { useCart } from '../../context/CartContext'
import { useSearch } from '../../context/SearchContext'

function Header({ onCartClick }) {
  const { cartCount } = useCart()
  const { searchQuery, setSearchQuery } = useSearch()

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__logo">
          <span className="header__logo-icon">🍔</span>
          <span className="header__logo-text">FastFood</span>
        </div>

        <div className="header__search">
          <input
            type="text"
            className="header__search-input"
            placeholder="Пошук страв..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="header__cart">
          <button className="header__cart-btn" onClick={onCartClick}>
            <span className="header__cart-icon">🛒</span>
            <span className="header__cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
