import { useState, useEffect, useCallback } from 'react'
import './CheckoutModal.css'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

function CheckoutModal({ isOpen, onClose }) {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Закриття по Escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  // Валідація телефону (українські номери)
  const validatePhone = (phone) => {
    // Видаляємо всі символи крім цифр і +
    const cleaned = phone.replace(/[^\d+]/g, '')
    // Перевіряємо формат: +380XXXXXXXXX або 0XXXXXXXXX
    const phoneRegex = /^(\+380|380|0)\d{9}$/
    return phoneRegex.test(cleaned)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Очищаємо помилку при зміні
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Валідація
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Введіть ім'я"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введіть номер телефону'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Невірний формат телефону (напр. +380991234567)'
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Введіть адресу доставки'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      addToast('Перевірте правильність заповнення форми', 'error')
      return
    }
    
    // Тут можна додати відправку на сервер
    console.log('Замовлення:', { ...formData, items: cartItems, total: cartTotal })
    setIsSubmitted(true)
    clearCart()
  }

  const handleClose = () => {
    setIsSubmitted(false)
    setFormData({ name: '', phone: '', address: '', comment: '' })
    setErrors({})
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-modal__header">
          <h2 className="checkout-modal__title" id="checkout-title">
            {isSubmitted ? '✅ Дякуємо!' : '📝 Оформлення замовлення'}
          </h2>
          <button className="checkout-modal__close" onClick={handleClose} aria-label="Закрити">×</button>
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
                  className={`checkout-form__input ${errors.name ? 'checkout-form__input--error' : ''}`}
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="checkout-form__error">{errors.name}</span>}
              </div>

              <div className="checkout-form__group">
                <label className="checkout-form__label">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  className={`checkout-form__input ${errors.phone ? 'checkout-form__input--error' : ''}`}
                  placeholder="+380 XX XXX XX XX"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="checkout-form__error">{errors.phone}</span>}
              </div>

              <div className="checkout-form__group">
                <label className="checkout-form__label">Адреса доставки *</label>
                <input
                  type="text"
                  name="address"
                  className={`checkout-form__input ${errors.address ? 'checkout-form__input--error' : ''}`}
                  placeholder="Вулиця, будинок, квартира"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="checkout-form__error">{errors.address}</span>}
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
