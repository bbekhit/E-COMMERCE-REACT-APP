import React, { Component } from "react";
import { connect } from "react-redux";
import { brands } from "../../constants/constants";
import {
  setTypesFilter,
  setMaxPriceFilter,
  setMinPriceFilter,
  setSearchFilter,
  setFavouritesFilter
} from "../../actions/filterActions";
import _ from "lodash";

class FilterProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      checked: [],
      favourites: [],
      isShown: false
    };
    this.delayedCallbak = _.debounce(this.middle, 2000);
  }

  componentDidMount() {
    if (this.props.initState) {
      this.setState({ open: this.props.initState });
    }
  }

  onClick = () => {
    this.setState({ open: !this.state.open });
  };

  onCheckChange = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState(
      {
        checked: newChecked
      },
      () => {
        this.props.setTypesFilter(this.state.checked);
      }
    );
  };

  handleChange = e => {
    e.persist();
    this.delayedCallbak(e);
  };

  middle = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.setSearchFilter(this.state.searchText);
      this.props.setMinPriceFilter(this.state.minPrice);
      this.props.setMaxPriceFilter(this.state.maxPrice);
    });
  };

  toggleFavourite = favourites => {
    this.setState({ favourites, isShown: !this.state.isShown }, () =>
      this.props.setFavouritesFilter(this.state.favourites)
    );
  };

  render() {
    const { open } = this.state;
    const {
      auth: { user }
    } = this.props;
    return (
      <div className="filters-wrapper">
        <div className="title">
          <h2>{this.props.title}</h2>
          {open ? (
            <i className="fa fa-caret-up" onClick={this.onClick} />
          ) : (
            <i className="fa fa-caret-down" onClick={this.onClick} />
          )}
        </div>
        {open
          ? brands.map(item => (
              <div key={item.id} className="check-wrapper">
                <h6> {item.name}</h6>
                <input
                  type="checkbox"
                  onChange={this.onCheckChange(item.name)}
                  checked={this.state.checked.indexOf(item.name) !== -1}
                />
              </div>
            ))
          : null}
        <div className="price">
          <input
            type="text"
            placeholder="Min Price"
            name="minPrice"
            onChange={this.handleChange}
          />
          <div className="text">to</div>
          <input
            type="text"
            name="maxPrice"
            placeholder="Max Price"
            onChange={this.handleChange}
          />
        </div>
        <div className="search">
          <input
            type="text"
            name="searchText"
            placeholder="Search Brands"
            onChange={this.handleChange}
          />
        </div>
        {Object.keys(user).length ? (
          <button
            className={this.state.isShown ? "active" : ""}
            onClick={
              this.state.isShown
                ? () => this.toggleFavourite([])
                : () =>
                    this.toggleFavourite(
                      user.favouriteList.length ? user.favouriteList : false
                    )
            }
          >
            My Favourites
          </button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    setTypesFilter,
    setMaxPriceFilter,
    setMinPriceFilter,
    setSearchFilter,
    setFavouritesFilter
  }
)(FilterProducts);
