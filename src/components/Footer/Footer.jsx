import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__section">
            <div className="footer__logo">
              <span className="footer__logo-icon">🍔</span>
              <span className="footer__logo-text">FastFood</span>
            </div>
            <p className="footer__description">
              Смачна їжа з доставкою до вашого дому. Швидко, якісно, смачно!
            </p>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">Контакти</h3>
            <ul className="footer__list">
              <li className="footer__item">📞 +380 (99) 123-45-67</li>
              <li className="footer__item">📧 info@fastfood.ua</li>
              <li className="footer__item">📍 м. Київ, вул. Хрещатик, 1</li>
            </ul>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">Графік роботи</h3>
            <ul className="footer__list">
              <li className="footer__item">Пн-Пт: 10:00 - 22:00</li>
              <li className="footer__item">Сб-Нд: 11:00 - 23:00</li>
              <li className="footer__item">Доставка: щодня</li>
            </ul>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">Соцмережі</h3>
            <div className="footer__socials">
              <a href="#" className="footer__social">📘</a>
              <a href="#" className="footer__social">📸</a>
              <a href="#" className="footer__social">✈️</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 FastFood. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
