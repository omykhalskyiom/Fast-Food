import { createContext, useContext, useState } from 'react'

const CategoryContext = createContext()

export function useCategory() {
  return useContext(CategoryContext)
}

export function CategoryProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState(null) // null = всі категорії

  const value = {
    activeCategory,
    setActiveCategory,
  }

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  )
}
