import './SkeletonCard.css'

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__image skeleton-pulse"></div>
      <div className="skeleton-card__content">
        <div className="skeleton-card__title skeleton-pulse"></div>
        <div className="skeleton-card__description skeleton-pulse"></div>
        <div className="skeleton-card__description skeleton-card__description--short skeleton-pulse"></div>
      </div>
      <div className="skeleton-card__footer">
        <div className="skeleton-card__price skeleton-pulse"></div>
        <div className="skeleton-card__btn skeleton-pulse"></div>
      </div>
    </div>
  )
}

export default SkeletonCard
