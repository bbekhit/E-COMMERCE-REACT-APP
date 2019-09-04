import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import { addFavourite, removeFavourite } from "../../actions/authActions";
import { connect } from "react-redux";
import noImage from "../../assets/images/noimage.png";
import FilterProducts from "./FilterProducts";
import filtersHelper from "../../utilis/filtersHelper";
import NoProduct from "./NoProduct";
import { throttle } from "lodash";
import Loader from "../Loader/Loader";

class ProductList extends Component {
  state = {
    count: 3,
    loading: false
  };

  componentDidMount() {
    this.props.getProducts();
    window.addEventListener("scroll", throttle(this.onScroll, 1000), false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.props.products.length
    ) {
      this.loadMore();
    }
  };

  loadMore = () => {
    if (this.state.count > 10) return;
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        count: this.state.count + 2,
        loading: false
      });
    }, 1000);
  };

  addFavourite(productId) {
    this.props.addFavourite(productId);
  }

  removeFavourite(productId) {
    this.props.removeFavourite(productId);
  }

  getFavourites = favourites => {
    this.setState({ favourites });
  };

  render() {
    const {
      products,
      auth: { user }
    } = this.props;
    const { count, loading } = this.state;

    return (
      <div className="outer-wrapper">
        <div className="left-wrapper">
          <FilterProducts title="Brands" />
        </div>
        <div className="scroll">
          <div className="right-wrapper">
            {products.length ? (
              products.slice(0, count).map((product, i) => (
                <div className="card" key={i}>
                  <img
                    src={product.images.length ? product.images[0] : noImage}
                    alt="Product"
                  />
                  <div style={{ padding: "1rem", marginBottom: "1rem" }}>
                    <h1>{product.brand}</h1>
                    <p className="price">${product.price}</p>
                    <p>
                      {product.description
                        .split(" ")
                        .slice(0, 10)
                        .join(" ")}
                      ...
                    </p>
                    <i
                      className={`fa fa-heart ${
                        user &&
                        user.favouriteList &&
                        user.favouriteList.filter(
                          item => item.product === product._id
                        ).length > 0
                          ? "red"
                          : ""
                      }`}
                      onClick={
                        user.favouriteList &&
                        user.favouriteList.filter(
                          item => item.product === product._id
                        ).length > 0
                          ? () => this.removeFavourite(product._id)
                          : () => this.addFavourite(product._id)
                      }
                    ></i>
                  </div>
                  <div className="btn">
                    <Link
                      className="product-link"
                      to={`/products/${product._id}`}
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <NoProduct text="No Products Found" />
            )}
          </div>
          <div
            style={{
              // background: "red",
              width: "100%",
              height: "40px",
              marginTop: "0",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {loading ? <Loader load /> : null}
          </div>

          {/* <p className="loading"> loading More Items..</p> : ""} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  products: filtersHelper(state.products, state.filters),
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProducts, addFavourite, removeFavourite }
)(ProductList);
