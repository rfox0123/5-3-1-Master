import React, { Component } from 'react';
import logo from '../images/weight-lifting-logo.png';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import actionTypes from '../actionTypes';
import SignOut from './auth/SignOut';

class NavBar extends Component {
  renderUserStatus = () => {
    if (this.props.userStatus === actionTypes.LOGGED_IN) {
      return <SignOut />;
    } else {
      return (
        <li>
          <a href="/SignIn">Sign In</a>
        </li>
      );
    }
  };

  style = {
    width: '50px',
  };

  render() {
    console.log(this.props);
    return (
      <Router>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <img src={logo} alt="logo" style={this.style} />
              </a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/Today" class="fortheloveofgod">
                  Todays Workout
                </a>
              </li>
              <li>
                <a href="/Progress">MY GAINZ</a>
              </li>
              <li>
                <a href="/Leaderboards">Leaderboards</a>
              </li>
              <li>
                <a href="/Forums">Forums</a>
              </li>
              <li>
                <a href="/Dashboard">Dashboard</a>
              </li>
              {this.renderUserStatus()}
            </ul>
          </div>
        </nav>
      </Router>
    );
  }
}

export default NavBar;
