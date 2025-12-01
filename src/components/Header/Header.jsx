import './Header.css'

function Header() {
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
          />
        </div>

        <div className="header__cart">
          <button className="header__cart-btn">
            <span className="header__cart-icon">🛒</span>
            <span className="header__cart-count">0</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
