import actionTypes from '../actionTypes';
import firebase from 'firebase';
import { firebaseApp, firebaseDb } from '../server/firebase';
import { store } from '../index.js';

//ACTION CREATORS-------------------
const updateProfile = () => {
  window.location = '/SetProfile';
};

export const loggedIn = () => {
  console.log('LOGGED IN ACTION');
  return {
    type: actionTypes.LOGGED_IN,
  };
};

const authError = error => {
  console.log('AUTH ERROR ACTIONS');
  return {
    type: actionTypes.AUTH_ERROR,
    payload: error,
  };
};

export const userAddedInfo = () => {
  console.log('USER ADDED INFO');
  return {
    type: actionTypes.USER_ADDED_INFO,
  };
};

//------------------------------------

export const userLogIn = (email, password) => {
  return dispatch => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        dispatch(authError(error));
      });
  };
};

export const createUser = (email, password) => {
  return dispatch => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => updateProfile())
      .catch(error => {
        dispatch(authError(error));
      });
  };
};

export function fetchUser(thisUser) {
  console.log('FETCH USER INFO');
  return dispatch => {
    if (thisUser != null) {
      var uid = thisUser.uid;
    }

    firebaseDb.ref('users/' + uid).on('value', snapshot => {
      const firebaseOutput = snapshot.val();

      let pushList = [];
      for (let prop in firebaseOutput) {
        pushList.push(prop);
      }

      const uploadList = pushList.map(a => {
        return firebaseOutput[a];
      });

      console.log('UPLOAD LIST', uploadList);

      let userName = uploadList[uploadList.length - 1];
      let lastUpload = uploadList[uploadList.length - 2];

      console.log('LAST UPLOAD', lastUpload);

      dispatch({
        type: actionTypes.FETCH_USER,
        userID: uid,
        fullName: userName,
        weight: lastUpload.weight,
        ormBench: lastUpload.oneRepMax['benchORM'],
        ormDeadlift: lastUpload.oneRepMax['deadliftORM'],
        ormOverheadPress: lastUpload.oneRepMax['overheadPressORM'],
        ormSquat: lastUpload.oneRepMax['squatORM'],
      });
    });
  };
}

export const loggedOut = () => {
  return dispatch => {
    return {
      type: actionTypes.LOGGED_OUT,
    };
  };
};
