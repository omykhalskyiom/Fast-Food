import './ProductCard.css'

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <span className="product-card__weight">{product.weight}</span>
      </div>
      <div className="product-card__footer">
        <span className="product-card__price">{product.price} грн</span>
        <button className="product-card__btn">
          <span>+</span>
          <span>🛒</span>
        </button>
      </div>
    </article>
  )
}

export default ProductCard
