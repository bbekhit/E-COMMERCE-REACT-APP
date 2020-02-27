import React, { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from "../../actions/productActions";
import ImageUpload from "../ImageUpload/ImageUpload";
import SelectList from "../Common/SelectList";
import { brands, models } from "../../constants/constants";
import PropTypes from "prop-types";

class ProductForm extends Component {
  constructor() {
    super();
    this.state = {
      product: {
        description: "",
        price: "",
        brand: "",
        model: "",
        images: []
      },
      errors: {}
    };
  }

  static propTypes = {
    addProduct: PropTypes.func,
    products: PropTypes.arrayOf(PropTypes.shape({}))
  };

  static defaultProps = {
    addProduct: () => {},
    products: []
  };

  onHandleChange = e => {
    let newObject = this.state.product;
    newObject[e.target.name] = e.target.value;
    this.setState({
      product: newObject
    });
  };

  imagesHandler = images => {
    let newImages = this.state.product.images;
    newImages.push(images);
    this.setState({
      images: newImages
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const productData = this.state.product;
    this.props.addProduct(productData);
    this.props.history.push('/products')
  };

  getModels = models => {
    let filteredModels;
    let output = [];
    if (this.state.product.brand) {
      filteredModels = models.filter(
        item => item.name === this.state.product.brand.toLowerCase()
      );
      filteredModels[0].models.forEach((item, i) =>
        output.push({
          name: item,
          id: i
        })
      );
    }
    return output;
  };

  showImages = () =>
    this.state.product.images.map((item, i) => (
      <div key={i}>
        <img src={item} width="100px" height="100px" alt="img" />
      </div>
    ));

  render() {
    const displayModels = this.getModels(models);
    return (
      <div className="product-form-wrapper">
        <h1>Add Product</h1>
        <form onSubmit={this.onSubmit}>
          <div className="drop-zone">
            <ImageUpload
              onUpload={images => this.imagesHandler(images)}
              maxFiles={5}
            />
          </div>
          {this.state.product.images.length ? (
            <div className="show-images">{this.showImages()}</div>
          ) : null}
          <SelectList
            label="Brand"
            options={brands}
            name="brand"
            value={this.state.product.brand}
            onChange={this.onHandleChange}
            className="brand"
          />
          {this.state.product.brand ? (
            <SelectList
              label="Model"
              options={displayModels}
              name="model"
              value={this.state.product.model || ""}
              onChange={this.onHandleChange}
              className="brand"
            />
          ) : null}
          <input
            placeholder="Enter Product Description"
            label="Description"
            name="description"
            type="text"
            value={this.state.product.description || ""}
            onChange={this.onHandleChange}
            error={this.state.errors.description}
          />
          <input
            placeholder=" Enter Product Price"
            label="Price"
            name="price"
            type="text"
            value={this.state.product.price}
            onChange={this.onHandleChange}
            error={this.state.errors.price}
          />
          <div className="button-wrapper">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { addProduct }
)(ProductForm);
