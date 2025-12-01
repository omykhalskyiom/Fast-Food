import './App.css'
import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import ProductList from './components/ProductList/ProductList'

function App() {
  return (
    <>
      <Header />
      <Categories />
      <main className="main">
        <ProductList />
      </main>
    </>
  )
}

export default App
