import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../components/Loader/Loader";

export default (ComposedClass, reload) => {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };
    componentDidMount() {
      const { isAuthenticated } = this.props.auth;

      if (!isAuthenticated) {
        if (reload) {
          this.props.history.push("/register");
        }
      } else {
        if (reload === false) {
          this.props.history.push("/dashboard");
        }
      }
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }

    render() {
      const { user } = this.props.auth;
      if (this.state.loading) {
        return (
          <div>
            <Loader />
          </div>
        );
      }
      return <ComposedClass {...this.props} user={user} />;
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth
  });

  return connect(mapStateToProps)(AuthenticationCheck);
};
