import React, { Component } from "react";
import { addProfile } from "../../actions/profileActions";
import { connect } from "react-redux";

class ProfileForm extends Component {
  state = {
    name: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = this.state;
    this.props.addProfile(data);
  };

  render() {
    return (
      <div style={{ margin: "100px auto" }}>
        <form onSubmit={this.onSubmit}>
          <input
            name="name"
            value={this.state.value}
            onChange={this.onChange}
          />
          <button>Add Profile</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addProfile }
)(ProfileForm);
