import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import firebase from 'firebase';

import UpdateProfileModal from './UpdateProfileModal';
import { firebaseDb } from '../server/firebase';

class Settings extends Component {
  handleDesc = event => {
    event.preventDefault();

    if (!this.state.desc) {
      console.log('NOT FILLED OUT YO');
    } else {
      const thisUser = firebase.auth().currentUser;
      if (thisUser != null) {
        var uid = thisUser.uid;
      }

      const date = Date();

      firebaseDb
        .ref('users/' + uid)
        .push({
          desc: this.state.desc,
          date: date
        })
        .then(() => {
          alert('Your description has been updated.');
        })
        .then(() => {
          this.setState({ desc: '' });
        });
    }
  };

  handleInput = event => {
    this.setState({
      desc: event.target.value
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Settings</h1>
        <form
          onSubmit={event => this.handleDesc(event)}
          style={{ width: '75vw', margin: 'auto' }}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>
              <h2>Tell us about yourself:</h2>
            </ControlLabel>
            <FormControl
              componentClass="textarea"
              maxLength="250"
              inputRef={ref => {
                this.description = ref;
              }}
              placeholder="Say what you're all about."
              onChange={event => this.handleInput(event)}
            />
          </FormGroup>
          <Button type="submit">Update description</Button>
        </form>
        <UpdateProfileModal />
      </div>
    );
  }
}

export default Settings;