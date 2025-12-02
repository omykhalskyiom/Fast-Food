import { memo } from 'react'
import './ProductCard.css'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

const ProductCard = memo(function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart()
  const { addToast } = useToast()

  // Знаходимо товар в кошику
  const cartItem = cartItems.find((item) => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  const handleAddToCart = () => {
    addToCart(product)
    addToast(`${product.name} додано в кошик!`, 'success')
  }

  return (
    <article className="product-card">
      {product.badge && (
        <span className={`product-card__badge product-card__badge--${product.badge}`}>
          {product.badge === 'hit' && '🔥 Хіт'}
          {product.badge === 'new' && '✨ Новинка'}
          {product.badge === 'sale' && '💰 Знижка'}
        </span>
      )}
      <div className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <span className="product-card__weight">{product.weight}</span>
      </div>
      <div className="product-card__footer">
        <span className="product-card__price">{product.price} грн</span>
        <button className="product-card__btn" onClick={handleAddToCart}>
          {quantity > 0 ? (
            <span className="product-card__qty">{quantity}</span>
          ) : (
            <span>+</span>
          )}
          <span>🛒</span>
        </button>
      </div>
    </article>
  )
})

export default ProductCard
