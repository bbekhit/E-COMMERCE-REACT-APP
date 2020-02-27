import React from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import "./styles/styles.scss";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import store from "./store";
import Register from "./components/Register/Register";
import ModalManager from "./components/Modals/ModalManager";
import ProductForm from "./components/Product/ProductForm";
import setAuthToken from "./utilis/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import ProductList from "./components/Product/ProductList";
import SingleProduct from "./components/Product/SingleProduct";
import ProfileForm from "./components/Profile/ProfileForm";
import Cart from "./components/Product/Cart";
import Auth from "./utilis/auth";
import Loader from "./components/Loader/Loader";
import Rating from "./components/Rating/Rating";
import Home from "./components/Home/Home";

if (localStorage.jwtToken && localStorage.currentUser) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  const currentUser = JSON.parse(localStorage.currentUser);
  store.dispatch(setCurrentUser(currentUser));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

const Main = withRouter(({ location }) => {
  return (
    <Provider store={store}>
      <div>
        {location.pathname !== "/login" && <Navbar />}
        <ModalManager />
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route
            exact
            path="/add-product"
            component={Auth(ProductForm, true)}
          />
          <Route exact path="/products" component={Auth(ProductList, null)} />
          <Route
            exact
            path="/products/:id"
            component={Auth(SingleProduct, true)}
          />
          <Route exact path="/add-profile" component={ProfileForm} />
          <Route exact path="/cart" component={Auth(Cart, true)} />
          <Route exact path="/loader" component={Auth(Loader, null)} />
          <Route exact path="/rating" component={Auth(Rating, null)} />
        </Switch>
      </div>
    </Provider>
  );
});
function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
