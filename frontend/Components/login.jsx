import React, { Component } from "react";
import { Button, Carousel, FloatingLabel, Form } from "react-bootstrap";
import Spinner from "./Spinner/spinner";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../http";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import picture from "../koolbulb2.jpg";


class Login extends Component {

  loginButton;

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isLoading: false,
    };
  }

  onLoginClickHandler = (e) => {
    e.preventDefault();
    this.loginButton.setAttribute("disabled", "disabled");
    this.setState({ isLoading: true }, async () => {
      const response = await login(this.state.username, this.state.password);
      if (!response.isSuccessful) {
        //toast.error(response.message);
        alert(response.message);
        this.setState({ isLoading: false });
      } else {
        document.cookie = "jwt-auth=" + response.data.token;
        toast.success(response.message);
        this.setState({ isLoading: false }, () => {
          this.props.onSetAuthTrue(response.data.user.username);
        });
      }
    });
  };

  componentDidMount() {
    this.props.verifyToken();
  }

  render() {
    return (
      <div style={{ position: "relative", height: "100%", width: "100%", overflow: "hidden" }}>
      <img
        src={picture}
        style={{ position: "fixed", height: "100%", width: "100%", zIndex: -1 }}
      />
      <div style={{ position: "absolute", top: "35%", left: "28.3%", transform: "translate(-50%, -50%)" }}>
                    <h1 style={{ color: "white", textAlign: "center" , fontSize : "1.5rem"}}>Hi there! Kindly enter your crendentials below there.</h1>
                </div>
      <div
        style={{
          position: "relative",
          left: "15%",
          zIndex: 1,
          maxWidth: "400px",
          maxHeight: "600px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <>
          {this.props.isAuthenticated ? (
            <Navigate to="/home" />
          ) : (
            <Form
              className="bg-light p-4 rounded shadow"
              style={{  margin: "250px auto", overflow: "hidden" }}
            >
              <h3>Login</h3>
              {this.state.isLoading ? (
                <Spinner />
              ) : (
                <>
                  <Form.Group className="mb-3 mt-4">
                    <FloatingLabel
                      label="Username *"
                      className="text-muted"
                      style={{ fontSize: "12px" }}
                    >
                      <Form.Control
                        required
                        type="text"
                        style={{ height: "50px", fontSize: "12px" }}
                        value={this.state.username}
                        onChange={(e) => {
                          this.setState({ username: e.target.value });
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      label="Password *"
                      className="text-muted"
                      style={{ fontSize: "12px" }}
                    >
                      <Form.Control
                        required
                        type="password"
                        style={{ height: "50px", fontSize: "12px" }}
                        value={this.state.password}
                        onChange={(e) => {
                          this.setState({ password: e.target.value });
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="dark"
                    style={{ fontSize: "11px" }}
                    onClick={this.onLoginClickHandler}
                    className="mt-3"
                    ref={(r) => {
                      this.loginButton = r;
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </Form>
          )}
        </>
      </div>
    </div>
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
    onSetAuthTrue: (username) => {
      dispatch(actions.setAuthTrue(username));
    },
    verifyToken: () => {
      dispatch(actions.verifyToken());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);