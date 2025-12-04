import './Categories.css'
import { useCategory } from '../../context/CategoryContext'
import { categories, getProductCountByCategory } from '../../data/products'

function Categories() {
  const { activeCategory, setActiveCategory } = useCategory()

  const handleCategoryClick = (categoryId) => {
    // Якщо клікнули на активну категорію - скидаємо фільтр
    if (activeCategory === categoryId) {
      setActiveCategory(null)
    } else {
      setActiveCategory(categoryId)
    }
  }

  return (
    <section className="categories">
      <div className="container">
        <ul className="categories__list">
          <li className="categories__item">
            <button
              className={`categories__btn ${activeCategory === null ? 'active' : ''}`}
              onClick={() => setActiveCategory(null)}
            >
              <span className="categories__icon">📋</span>
              <span className="categories__name">Всі</span>
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id} className="categories__item">
              <button
                className={`categories__btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="categories__icon">{category.icon}</span>
                <span className="categories__name">{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Categories
