import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <span className="error-boundary__icon">😕</span>
            <h2 className="error-boundary__title">Щось пішло не так</h2>
            <p className="error-boundary__text">
              Виникла помилка при завантаженні сторінки.
              Спробуйте оновити сторінку.
            </p>
            <button className="error-boundary__btn" onClick={this.handleReload}>
              Оновити сторінку
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
