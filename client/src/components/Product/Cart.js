import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromCart, clearCart } from "../../actions/authActions";
import noImage from "../../assets/images/noimage.png";
import NoProduct from "./NoProduct";

export class Cart extends Component {
  state = {
    text: ""
  };
  clearCart = () => {
    this.props.clearCart();
    this.setState({ text: "Thank You For Your Purchase" });
  };
  render() {
    const {
      auth: { user, isAuthenticated }
    } = this.props;
    return (
      <div>
        <div className="cart-wrapper">
          <h1 className="head">Items in your cart</h1>
          {isAuthenticated ? (
            user.cart.length ? (
              user.cart.map((item, i) => (
                <div className="card" key={i}>
                  <img
                    src={
                      item.product.images.length
                        ? item.product.images[0]
                        : noImage
                    }
                    alt="Product"
                  />
                  <div style={{ padding: "1rem", marginBottom: "1rem" }}>
                    <h1>{item.product.brand}</h1>
                    <p className="price">${item.product.price}</p>
                    <p>
                      {item.product.description
                        .split(" ")
                        .slice(0, 10)
                        .join(" ")}
                      ...
                    </p>
                  </div>
                  <div
                    className="btn"
                    onClick={() => this.props.removeFromCart(item.product._id)}
                  >
                    Explore
                  </div>
                </div>
              ))
            ) : (
              <NoProduct
                text={this.state.text ? this.state.text : "No Items Found"}
              />
            )
          ) : null}
        </div>
        <div className="btn-wrapper">
          {isAuthenticated && user.cart.length ? (
            <button onClick={() => this.clearCart()}>Check Out</button>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { removeFromCart, clearCart }
)(Cart);
