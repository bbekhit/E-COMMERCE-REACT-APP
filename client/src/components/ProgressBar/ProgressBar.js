import React, { Component } from "react";

class ProgressBar extends Component {
  render() {
    return (
      <div className="progressbar">
        <div
          className="filler"
          style={{ width: `${this.props.filler}%` }}
        ></div>
      </div>
    );
  }
}

export default ProgressBar;
