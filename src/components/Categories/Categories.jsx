import './Categories.css'

const categories = [
  { id: 1, name: 'Бургери', icon: '🍔' },
  { id: 2, name: 'Піца', icon: '🍕' },
  { id: 3, name: 'Хот-доги', icon: '🌭' },
  { id: 4, name: 'Картопля', icon: '🍟' },
  { id: 5, name: 'Напої', icon: '🥤' },
  { id: 6, name: 'Десерти', icon: '🍩' },
]

function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <ul className="categories__list">
          {categories.map((category) => (
            <li key={category.id} className="categories__item">
              <button className="categories__btn">
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
