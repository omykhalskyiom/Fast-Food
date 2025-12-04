import { useState } from 'react'
import './CartModal.css'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

function CartModal({ isOpen, onClose, onCheckout }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
  const { addToast } = useToast()
  const [removingId, setRemovingId] = useState(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  if (!isOpen) return null

  const handleRemove = (id) => {
    setItemToDelete(null)
    setRemovingId(id)
    setTimeout(() => {
      removeFromCart(id)
      setRemovingId(null)
      addToast('Товар видалено з кошика')
    }, 300)
  }

  const handleClearCart = () => {
    clearCart()
    setShowClearConfirm(false)
    addToast('Кошик очищено')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal__header">
          <h2 className="cart-modal__title">🛒 Кошик</h2>
          <button className="cart-modal__close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="cart-modal__content">
          {cartItems.length === 0 ? (
            <div className="cart-modal__empty">
              <span className="cart-modal__empty-icon">🛒</span>
              <p className="cart-modal__empty-text">Кошик порожній</p>
              <p className="cart-modal__empty-hint">Додайте щось смачненьке з меню!</p>
              <button className="cart-modal__empty-btn" onClick={onClose}>Перейти до меню</button>
            </div>
          ) : (
            <ul className="cart-modal__list">
              {cartItems.map((item) => (
                <li key={item.id} className={`cart-item ${removingId === item.id ? 'cart-item--removing' : ''}`}>
                  <img src={item.image} alt={item.name} className="cart-item__image" />
                  <div className="cart-item__info">
                    <h3 className="cart-item__name">{item.name}</h3>
                    <span className="cart-item__price">{item.price} грн</span>
                  </div>
                  <div className="cart-item__quantity">
                    <button
                      className="cart-item__btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="cart-item__count">{item.quantity}</span>
                    <button
                      className="cart-item__btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="cart-item__total">{item.price * item.quantity} грн</span>
                  <button
                    className="cart-item__remove"
                    onClick={() => setItemToDelete(item)}
                    title="Видалити"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-modal__footer">
            <div className="cart-modal__total">
              <span>Загалом:</span>
              <span className="cart-modal__total-price">{cartTotal} грн</span>
            </div>
            <div className="cart-modal__actions">
              <button className="cart-modal__clear" onClick={() => setShowClearConfirm(true)}>
                Очистити
              </button>
              <button className="cart-modal__checkout" onClick={onCheckout}>
                Оформити замовлення
              </button>
            </div>
          </div>
        )}

        {/* Модалка підтвердження очищення */}
        {showClearConfirm && (
          <div className="clear-confirm">
            <div className="clear-confirm__content">
              <p className="clear-confirm__text">Очистити весь кошик?</p>
              <div className="clear-confirm__actions">
                <button className="clear-confirm__btn clear-confirm__btn--cancel" onClick={() => setShowClearConfirm(false)}>
                  Скасувати
                </button>
                <button className="clear-confirm__btn clear-confirm__btn--confirm" onClick={handleClearCart}>
                  Очистити
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Модалка підтвердження видалення товару */}
        {itemToDelete && (
          <div className="clear-confirm">
            <div className="clear-confirm__content">
              <p className="clear-confirm__text">Видалити "{itemToDelete.name}" з кошика?</p>
              <div className="clear-confirm__actions">
                <button className="clear-confirm__btn clear-confirm__btn--cancel" onClick={() => setItemToDelete(null)}>
                  Скасувати
                </button>
                <button className="clear-confirm__btn clear-confirm__btn--confirm" onClick={() => handleRemove(itemToDelete.id)}>
                  Видалити
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartModal
