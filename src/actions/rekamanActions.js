import { dispatchError, dispatchLoading, dispatchSuccess } from '../utils/dispatch';
import database from '@react-native-firebase/database';
import { getDatabase, ref, set } from 'firebase/database';

export const UPLOAD_REKAMAN = 'UPLOAD_REKAMAN';
export const GET_REKAMANS = 'GET_REKAMANS';

export const uploadRekaman = (time, uid, url, namaFile) => {
  return (dispatch) => {
    const dataBaru = {
      uid,
      namaFile,
      url,
      bintang: 0,
    };

    const db = getDatabase();
    set(ref(db, '/rekamans/' + time), dataBaru)
      .then(() => {
        dispatchSuccess(dispatch, UPLOAD_REKAMAN, dataBaru);
      })
      .catch((err) => {
        dispatchError(dispatch, err.message);
        alert(err.message);
      });
  };
};

export const getRekaman = () => {
  return (dispatch) => {
    // loading
    dispatchLoading(dispatch, GET_REKAMANS);
    // firebase
    database()
      .ref('/rekamans/')
      .on('value', (snapshot) => {
        // hasil
        let data = snapshot.val() ? snapshot.val() : [];
        let dataItem = { ...data };
        dispatchSuccess(dispatch, GET_REKAMANS, dataItem);
      });
  };
};
