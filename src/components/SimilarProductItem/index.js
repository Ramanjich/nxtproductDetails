// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {eachItem} = props
  const {title, brand, price, imageUrl, rating} = eachItem
  return (
    <li className="similar-items">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-image"
      />
      <h1 className="similar-item-heading">{title}</h1>
      <p>by {brand}</p>
      <div className="similar-p-r-con">
        <p>Rs{price}/- </p>
        <div className="p-r-con">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="similar-star-img"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
