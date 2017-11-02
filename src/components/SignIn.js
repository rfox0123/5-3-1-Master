import React, { Component } from "react";
import firebase from "firebase";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import "firebaseui/dist/firebaseui.css";
import "../css/App.css";

import AuthLinks from "../components/auth/AuthLinks";
import * as actions from "../actions";

class SignIn extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.location = "/dashboard"; //After successful login, user will be redirected to user dashboard
      }
    });
  }

  handleUser = event => {
    this.setState({
      email: event.target.value
    });
  };

  handlePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.userLogIn(this.state.email, this.state.password);
  };

  renderError = () => {
    if (this.props.state.auth.error) {
      switch (this.props.state.auth.error.code) {
        case "auth/wrong-password":
          return <div>wrong password idiot</div>;
        case "auth/invalid-email":
          return <div>enter a valid email, idiot</div>;
        case "auth/user-not-found":
          return <div>sorry, user not found</div>;
        default:
          return <div className="betheanswer" />;
      }
    }
  };

  renderSignIn = () => {
    if (window.location.search === "?mode=select") {
      return <div />;
    } else {
      return (
        <div>
          <form onSubmit={event => this.handleSubmit(event)}>
            <input
              type="text"
              placeholder="email"
              onChange={event => this.handleUser(event)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              onChange={event => this.handlePassword(event)}
            />
            <br />
            <button type="submit">Log In</button>
            <NavLink to="/">
              <span>Sign Up</span>
            </NavLink>
          </form>
        </div>
      );
    }
  };

  render() {
    const { state } = this.props;
    return (
      <div className="signinprob" style={{ width: "100vw", height: "100vh" }}>
        <hr />
        {this.renderSignIn()}
        {this.renderError()}
        {/* <AuthLinks authUI={state.auth.authUI} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
