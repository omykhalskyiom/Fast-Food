import { useState } from 'react'
import './CheckoutModal.css'
import { useCart } from '../../context/CartContext'

function CheckoutModal({ isOpen, onClose }) {
  const { cartItems, cartTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Тут можна додати відправку на сервер
    console.log('Замовлення:', { ...formData, items: cartItems, total: cartTotal })
    setIsSubmitted(true)
    clearCart()
  }

  const handleClose = () => {
    setIsSubmitted(false)
    setFormData({ name: '', phone: '', address: '', comment: '' })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-modal__header">
          <h2 className="checkout-modal__title">
            {isSubmitted ? '✅ Дякуємо!' : '📝 Оформлення замовлення'}
          </h2>
          <button className="checkout-modal__close" onClick={handleClose}>×</button>
        </div>

        <div className="checkout-modal__content">
          {isSubmitted ? (
            <div className="checkout-success">
              <p className="checkout-success__text">
                Ваше замовлення прийнято!<br />
                Ми зв'яжемося з вами найближчим часом.
              </p>
              <button className="checkout-success__btn" onClick={handleClose}>
                Повернутися до меню
              </button>
            </div>
          ) : (
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="checkout-form__group">
                <label className="checkout-form__label">Ім'я *</label>
                <input
                  type="text"
                  name="name"
                  className="checkout-form__input"
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="checkout-form__group">
                <label className="checkout-form__label">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  className="checkout-form__input"
                  placeholder="+380 XX XXX XX XX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="checkout-form__group">
                <label className="checkout-form__label">Адреса доставки *</label>
                <input
                  type="text"
                  name="address"
                  className="checkout-form__input"
                  placeholder="Вулиця, будинок, квартира"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="checkout-form__group">
                <label className="checkout-form__label">Коментар</label>
                <textarea
                  name="comment"
                  className="checkout-form__textarea"
                  placeholder="Побажання до замовлення..."
                  value={formData.comment}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="checkout-form__summary">
                <span>До сплати:</span>
                <span className="checkout-form__total">{cartTotal} грн</span>
              </div>

              <button type="submit" className="checkout-form__submit">
                Підтвердити замовлення
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutModal
