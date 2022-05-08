import { dispatchLoading, dispatchSuccess, dispatchError } from '../utils/dispatch';
import database from '@react-native-firebase/database';

export const GET_DATA = 'GET_DATA';

export const DELETE_DATA = 'DELETE_DATA';

export const getData = () => {
  return (dispatch) => {
    // loading
    dispatchLoading(dispatch, GET_DATA);
    // firebase
    database()
      .ref('/users/')
      .on('value', (snapshot) => {
        // hasil
        let data = snapshot.val() ? snapshot.val() : [];
        let dataItem = { ...data };
        dispatchSuccess(dispatch, GET_DATA, dataItem);
      });
  };
};

export const DeleteData = (role, uid) => {
  return (dispatch) => {
    // loading
    dispatchLoading(dispatch, DELETE_DATA);
    // delete realtime database
    database()
      .ref('/users/' + uid)
      .remove();
    dispatchSuccess(dispatch, DELETE_DATA, null);
  };
};
