import React, { Component } from "react";
import Star from "./Star";
import { updateRating } from "../../actions/productActions";
import { connect } from "react-redux";

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicValue: props.dynamicValue,
      value: 0,
      ratingId: props.id
    };
  }
  handleClick = newValue => {
    const { dynamicValue, ratingId } = this.state;
    this.setState({
      value: newValue,
      dynamicValue: newValue
    });
    this.props.updateRating(this.props.productId, dynamicValue, ratingId);
  };
  handleMouseEnter = newValue => {
    this.setState({ dynamicValue: newValue });
  };
  handleMouseLeave = () => {
    this.setState({ dynamicValue: this.state.value });
  };

  render() {
    const { dynamicValue } = this.state;
    const starSpans = [];

    for (let v = 1; v <= 5; v++) {
      starSpans.push(
        <Star
          color="#FFC107"
          isFilled={v <= dynamicValue}
          value={v}
          handleHover={this.handleMouseEnter}
          handleHoverLeave={this.handleMouseLeave}
          handleClick={this.handleClick}
        />
      );
    }
    return (
      <div>
        {starSpans.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    );
  }
}
export default connect(
  null,
  { updateRating }
)(Rating);
