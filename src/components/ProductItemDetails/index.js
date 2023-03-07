import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {
    productsDetails: {},
    isLoading: true,
    similarProducts: [],
    quantity: 1,
    apiStatusp: true,
  }

  componentDidMount() {
    this.getProductsDetails()
  }

  getProductsDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const accessToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const camelCaseObject = {
        availability: data.availability,
        title: data.title,
        brand: data.brand,
        price: data.price,
        id: data.id,
        imageUrl: data.image_url,
        rating: data.rating,
        description: data.description,

        reviews: data.total_reviews,
      }

      const updatedDatasimilar = data.similar_products.map(eachSimilar => ({
        availability: eachSimilar.availability,
        title: eachSimilar.title,
        brand: eachSimilar.brand,
        price: eachSimilar.price,
        id: eachSimilar.id,
        imageUrl: eachSimilar.image_url,
        rating: eachSimilar.rating,
        description: eachSimilar.description,

        reviews: eachSimilar.total_reviews,
      }))

      this.setState({
        productsDetails: camelCaseObject,
        similarProducts: updatedDatasimilar,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: false, apiStatusp: false})
    }
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderProductDetails = () => {
    const {productsDetails, similarProducts, quantity} = this.state
    const {
      availability,
      title,
      brand,
      price,
      imageUrl,
      rating,
      description,
      reviews,
    } = productsDetails

    return (
      <>
        <div className="products-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="details-containers">
            <h1 className="p-title">{title}</h1>
            <p className="p-price">Rs {price}/- </p>
            <div className="container-1">
              <div className="r-star-con">
                <p className="p-rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-img"
                />
              </div>
              <p>{reviews} Reviews</p>
            </div>
            <p className="p-description">{description}</p>
            <p>
              <span className="span-ele-1">Availability: </span>
              {availability}
            </p>
            <p>
              <span className="span-ele-2">Brand: </span> {brand}
            </p>
            <div className="count-con">
              <button
                type="button"
                className="minus-btn"
                data-testid="minus"
                onClick={this.onDecrement}
              >
                <BsDashSquare />
              </button>

              <p className="quantity">{quantity}</p>

              <button
                type="button"
                className="plus-btn"
                data-testid="plus"
                onClick={this.onIncrement}
              >
                <BsPlusSquare />
              </button>
            </div>
            <button type="button" className="add-to-card-btn">
              ADD TO CART
            </button>
          </div>
        </div>

        <ul className="similar-product-items">
          {similarProducts.map(eachItem => (
            <SimilarProductItem eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  goToProductRoute = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderProductsNotFound = () => (
    <div className="no-products-found-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="error-view-img"
      />
      <h1>Product Not Found</h1>
      <button
        type="button"
        className="continue-btn"
        onClick={this.goToProductRoute}
      >
        Continue Shopping
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading, apiStatusp} = this.state
    const renderring = apiStatusp
      ? this.renderProductDetails()
      : this.renderProductsNotFound()

    return (
      <div className="products-containers">
        <Header />
        {isLoading ? this.renderLoader() : renderring}
      </div>
    )
  }
}

export default ProductItemDetails
