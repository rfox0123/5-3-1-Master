import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';
import profilePicture from '../images/anon-user.jpg';

class UserState extends Component {
  style = {
    height: '30vh',
    width: '15vw',
  };

  render() {
    const { state } = this.props;
    return (
      <div>
        <img src={profilePicture} alt="user-image" style={this.style} />
        <div>
          <h3>{this.props.state.user.fullName}</h3>
          <div>
            <h6>Current Weight: {this.props.state.user.weight}</h6>
            <h6>Bench: {this.props.state.user.ormBench}</h6>
            <h6>Overhead Press: {this.props.state.user.ormOverheadPress}</h6>
            <h6>Squats: {this.props.state.user.ormSquat}</h6>
            <h6>Deadlift: {this.props.state.user.ormDeadlift}</h6>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserState);
