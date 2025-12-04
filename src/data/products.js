// Дані продуктів для демонстрації
// В реальному проекті це буде API

export const products = [
  {
    id: 1,
    name: 'Чізбургер',
    description: 'Соковита котлета, сир чедер, свіжі овочі, фірмовий соус',
    weight: '250 г',
    price: 89,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    category: 1,
    badge: 'hit',
  },
  {
    id: 2,
    name: 'Подвійний бургер',
    description: 'Дві котлети, подвійний сир, бекон, цибуля, соус BBQ',
    weight: '380 г',
    price: 139,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500',
    category: 1,
    badge: 'new',
  },
  {
    id: 3,
    name: 'Піца Маргарита',
    description: 'Томатний соус, моцарела, базилік, оливкова олія',
    weight: '450 г',
    price: 159,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500',
    category: 2,
  },
  {
    id: 4,
    name: 'Піца Пепероні',
    description: 'Томатний соус, моцарела, пепероні, орегано',
    weight: '480 г',
    price: 179,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
    category: 2,
    badge: 'hit',
  },
  {
    id: 5,
    name: 'Хот-дог класичний',
    description: 'Сосиска, гірчиця, кетчуп, свіжа цибуля',
    weight: '180 г',
    price: 59,
    image: 'https://images.unsplash.com/photo-1612392062631-94f8b11a7ae5?w=500',
    category: 3,
    badge: 'sale',
  },
  {
    id: 6,
    name: 'Картопля фрі',
    description: 'Хрустка золотиста картопля з сіллю',
    weight: '150 г',
    price: 49,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
    category: 4,
  },
  {
    id: 7,
    name: 'Кока-Кола',
    description: 'Охолоджений напій',
    weight: '500 мл',
    price: 35,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500',
    category: 5,
  },
  {
    id: 8,
    name: 'Донат',
    description: 'Повітряний пончик з шоколадною глазур\'ю',
    weight: '80 г',
    price: 39,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500',
    category: 6,
    badge: 'new',
  },
]

export const categories = [
  { id: 1, name: 'Бургери', icon: '🍔' },
  { id: 2, name: 'Піца', icon: '🍕' },
  { id: 3, name: 'Хот-доги', icon: '🌭' },
  { id: 4, name: 'Картопля', icon: '🍟' },
  { id: 5, name: 'Напої', icon: '🥤' },
  { id: 6, name: 'Десерти', icon: '🍩' },
]

// Отримати кількість товарів у категорії
export const getProductCountByCategory = (categoryId) => {
  if (categoryId === null) return products.length
  return products.filter(p => p.category === categoryId).length
}

// Отримати мінімальну та максимальну ціну
export const getPriceRange = () => {
  const prices = products.map(p => p.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
}
