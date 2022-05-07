import { dispatchLoading, dispatchSuccess, dispatchError } from '../utils/dispatch';
import database from '@react-native-firebase/database';

export const GET_DATA_SISWA = 'GET_DATA_SISWA';
export const GET_DATA_GURU = 'GET_DATA_GURU';

export const DELETE_DATA = 'DELETE_DATA';

export const getDataSiswa = () => {
  return (dispatch) => {
    // loading
    dispatchLoading(dispatch, GET_DATA_SISWA);
    // firebase
    database()
      .ref('/siswa/')
      .on('value', (snapshot) => {
        // hasil
        let data = snapshot.val() ? snapshot.val() : [];
        let dataItem = { ...data };
        dispatchSuccess(dispatch, GET_DATA_SISWA, dataItem);
      });
  };
};
export const getDataGuru = () => {
  return (dispatch) => {
    // loading
    dispatchLoading(dispatch, GET_DATA_GURU);
    // firebase
    database()
      .ref('/guru/')
      .on('value', (snapshot) => {
        // hasil
        let data = snapshot.val() ? snapshot.val() : [];
        let dataItem = { ...data };
        dispatchSuccess(dispatch, GET_DATA_GURU, dataItem);
      });
  };
};

export const DeleteData = (role, uid) => {
  return (dispatch) => {
    // loading
    dispatchLoading(dispatch, DELETE_DATA);
    // delete realtime database
    database()
      .ref('/' + role + '/' + uid)
      .remove();
    dispatchSuccess(dispatch, DELETE_DATA, null);
  };
};
