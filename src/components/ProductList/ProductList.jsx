import { useMemo, useState } from 'react'
import './ProductList.css'
import ProductCard from '../ProductCard/ProductCard'
import { useCategory } from '../../context/CategoryContext'
import { useSearch } from '../../context/SearchContext'
import { products, getPriceRange } from '../../data/products'

function ProductList() {
  const { activeCategory } = useCategory()
  const { searchQuery } = useSearch()
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999 })
  const [showFilters, setShowFilters] = useState(false)
  
  const { min: minPrice, max: maxPrice } = getPriceRange()

  // Мемоізуємо фільтрацію для оптимізації
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = activeCategory === null || product.category === activeCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
      return matchesCategory && matchesSearch && matchesPrice
    })

    // Сортування
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return result
  }, [activeCategory, searchQuery, sortBy, priceRange])

  return (
    <section className="products">
      <div className="container">
        <div className="products__header">
          <h2 className="products__title">Меню</h2>
          <div className="products__controls">
            <button 
              className={`products__filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Фільтри"
            >
              ⚙️ Фільтри
            </button>
            <select 
              className="products__sort" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Сортування"
            >
              <option value="default">За замовчуванням</option>
              <option value="price-asc">Ціна: від низької</option>
              <option value="price-desc">Ціна: від високої</option>
              <option value="name">За назвою</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="products__filters">
            <div className="products__filter-group">
              <label className="products__filter-label">Ціна: {priceRange.min} - {priceRange.max} грн</label>
              <div className="products__price-inputs">
                <input
                  type="number"
                  className="products__price-input"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  min={minPrice}
                  max={priceRange.max}
                  placeholder="Від"
                />
                <span>—</span>
                <input
                  type="number"
                  className="products__price-input"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  min={priceRange.min}
                  max={maxPrice}
                  placeholder="До"
                />
              </div>
            </div>
            <button 
              className="products__filter-reset"
              onClick={() => setPriceRange({ min: 0, max: 999 })}
            >
              Скинути
            </button>
          </div>
        )}

        <p className="products__count">Знайдено: {filteredProducts.length} товарів</p>

        {filteredProducts.length === 0 ? (
          <div className="products__empty">
            <span className="products__empty-icon">🔍</span>
            <p className="products__empty-text">Товари не знайдено</p>
            <p className="products__empty-hint">Спробуйте змінити фільтри або пошуковий запит</p>
          </div>
        ) : (
          <div className="products__grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductList
