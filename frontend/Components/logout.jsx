import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Navigate } from "react-router-dom";

class Logout extends Component {

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
        <>
          {!this.props.isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <></>
          )}
        </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);