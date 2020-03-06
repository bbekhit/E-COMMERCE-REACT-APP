import React, { Component } from "react";
import {
  getProducts,
  addReview,
  editReview,
  addLike,
  removeLike,
  removeReview
} from "../../actions/productActions";
import { addToCart } from "../../actions/authActions";

import { connect } from "react-redux";
import noimage from "../../assets/images/noimage.png";
import moment from "moment";
import Rating from "../Rating/Rating";
import noImage from "../../assets/images/noimage.png";

class SingleProduct extends Component {
  state = {
    text: "",
    reviewId: "",
    likes: [],
    count: 4,
    isEditing: false,
    reviewData: ""
  };

  onChange = e => {
    this.setState({ text: e.target.value });
  };

  componentDidMount() {
    this.props.getProducts();
  }

  onSubmit = (e, productId) => {
    const reviewId = this.state.reviewId;
    const reviewData = this.state.text;
    e.preventDefault();
    const data = {
      text: this.state.text
    };
    this.state.isEditing
      ? this.props.editReview(productId, reviewId, reviewData)
      : this.props.addReview(productId, data);

    this.setState({ text: "", isEditing: false });
  };

  addLike(productId, reviewId) {
    this.props.addLike(productId, reviewId);
  }

  removeLike(productId, reviewId) {
    this.props.removeLike(productId, reviewId);
  }

  loadMore = () => {
    this.setState({ count: this.state.count + 4 });
  };

  addToCart = product => {
    this.props.addToCart(product);
  };

  handleEdit = id => {
    const { product } = this.props;
    const selectedReview = product.reviews.find(item => item._id === id);
    this.setState({
      text: selectedReview.text,
      isEditing: true,
      reviewId: selectedReview._id,
      reviewData: this.state.text
    });
  };

  render() {
    const { product } = this.props;
    const { user } = this.props.auth;
    const rating =
      product && product.rating.length
        ? product.rating.filter(item => item.user._id !== user.id)[0]
        : {};
    return (
      <div className="single-product-wrapper">
        <div className="left">
          {product && product.images.length ? (
            <div className="images-wrapper">
              <img
                src={product.images[0]}
                className="imgOne"
                onClick={() =>
                  this.props.openModal("SlideModal", {
                    slides: this.state.slides,
                    open: true
                  })
                }
                alt="product"
              />
              <img
                src={product.images[1] ? product.images[1] : noImage}
                className="imgTwo"
                alt="product"
              />
              <img
                src={product.images[2] ? product.images[2] : noImage}
                className="imgThree"
                alt="product"
              />
            </div>
          ) : (
            <div className="images-wrapper">
              <img src={noimage} alt="product" className="noimage" />
            </div>
          )}
        </div>
        <div className="right">
          {product ? (
            <div className="product-info">
              <div className="product-info-text">
                <div
                  onClick={() => this.addToCart(product)}
                  className="cart-btn"
                >
                  Add To Cart
                </div>
                <h1>{product.brand}</h1>
                <Rating
                  productId={product._id}
                  dynamicValue={product.rating.dynamicValue}
                  id={product.rating._id}
                />
                <h3>{product.model}</h3>
                <p>${product.price}</p>
                <p>{product.description}</p>
                <div className="product-tags">
                  <i className="fa fa-truck" />
                  <p>Free Shipping</p>
                </div>
              </div>
              <div className="reviews-wrapper">
                <form onSubmit={e => this.onSubmit(e, product._id)}>
                  <input
                    type="text"
                    placeholder="Add Review"
                    onChange={this.onChange}
                    value={this.state.text}
                    name="review"
                  />
                  <button>
                    {this.state.isEditing ? "Edit Review" : "Add Review"}
                  </button>
                </form>
              </div>
              {product.reviews.slice(0, this.state.count).map((item, i) => {
                const likes = item.likes;
                return (
                  <div key={i} className="review-item">
                    <p>
                      reviewed by: <span>{item.name}</span>
                    </p>
                    <p>{item.text}</p>
                    <div className="like-wrapper">
                      <p className="date">
                        {moment(item.date).format("MMM Do YY")}
                      </p>
                      <i
                        className={`fa fa-thumbs-up ${
                          likes.filter(like => like.user === user.id).length > 0
                            ? "blue"
                            : ""
                        }`}
                        onClick={
                          likes.filter(like => like.user === user.id).length > 0
                            ? () => this.removeLike(product._id, item._id)
                            : () => this.addLike(product._id, item._id)
                        }
                      ></i>
                      <p>{likes.length}</p>
                      {user.id === item.user ? (
                        <div className="icons-wrapper">
                          <div className="delete">
                            <i
                              className="fa fa-trash"
                              onClick={() =>
                                this.props.removeReview(product._id, item._id)
                              }
                            ></i>
                          </div>
                          <div className="edit">
                            <i
                              className="fa fa-edit"
                              onClick={() => this.handleEdit(item._id)}
                            ></i>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              {product.reviews.length > 4 ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button onClick={this.loadMore} className="load-more">
                    Load More
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  product: state.products.find(
    product => product._id === props.match.params.id
  ),
  auth: state.auth,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  {
    getProducts,
    addReview,
    editReview,
    addLike,
    removeLike,
    removeReview,
    addToCart
  }
)(SingleProduct);
