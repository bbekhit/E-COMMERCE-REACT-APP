import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openModal } from "../../actions/modalActions";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";

class Navbar extends Component {
  static propTypes = {
    openModal: PropTypes.func
  };

  static defaultProps = {
    openModal: () => {}
  };

  handleClick() {
    const mainNav = document.querySelector(".main-nav");
    return mainNav.classList.toggle("show");
  }

  logoutUser = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/products");
  };

  render() {
    const { user, isAuthenticated } = this.props.auth;
    return (
      <div className="navbarWrapper">
        <div className="menuBtn" onClick={this.handleClick}>
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </div>
        <div>
          <Link className="logo" to="/">
            Shopy
          </Link>
        </div>
        <ul className="main-nav">
          <li className="first">
            <Link className="link" to="/add-product">
              Add Product
            </Link>
          </li>
          <li>
            <Link className="link" to="/products">
              Products
            </Link>
          </li>
          {isAuthenticated ? (
            <div style={{ display: "flex" }}>
              <li onClick={this.logoutUser} style={{ cursor: "pointer" }}>
                <Link className="link">Logout</Link>
              </li>
              <li>
                <Link className="link" to="/cart">
                  <i className={`cart-icon fa fa-shopping-cart`}>
                    {isAuthenticated ? (
                      user.cart.length >= 1 ? (
                        <span>{user.cart.length}</span>
                      ) : null
                    ) : null}
                  </i>
                </Link>
              </li>
            </div>
          ) : (
            <div className="auth-buttons">
              <li>
                <div
                  onClick={() => this.props.openModal("LoginModal")}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </div>
              </li>
              <li>
                <Link className="link" to="/register">
                  Sign up
                </Link>
              </li>
            </div>
          )}
          <li>
            <div className="user-name">
              {isAuthenticated ? `Hello ${user.name}` : null}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { openModal, logoutUser }
)(withRouter(Navbar));
