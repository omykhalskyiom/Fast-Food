import './CartModal.css'
import { useCart } from '../../context/CartContext'

function CartModal({ isOpen, onClose, onCheckout }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal__header">
          <h2 className="cart-modal__title">🛒 Кошик</h2>
          <button className="cart-modal__close" onClick={onClose}>×</button>
        </div>

        <div className="cart-modal__content">
          {cartItems.length === 0 ? (
            <p className="cart-modal__empty">Кошик порожній</p>
          ) : (
            <ul className="cart-modal__list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
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
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️
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
              <button className="cart-modal__clear" onClick={clearCart}>
                Очистити
              </button>
              <button className="cart-modal__checkout" onClick={onCheckout}>
                Оформити замовлення
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartModal
