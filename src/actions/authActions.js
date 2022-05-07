import { dispatchError, dispatchLoading, dispatchSuccess } from '../utils/dispatch';
import auth from '@react-native-firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = (data, password, role) => {
  return (dispatch) => {
    // loading
    dispatchLoading(dispatch, REGISTER_USER);
    // firebase
    if ((data, password)) {
      auth()
        .createUserWithEmailAndPassword(data.email, password)
        .then((res) => {
          // ambil uid buat data baru
          let dataBaru = {
            ...data,
            uid: res.user.uid,
          };
          // simpan ke firebase realtime database
          const db = getDatabase();
          set(ref(db, '/' + role + '/' + res.user.uid), dataBaru);
          //   berhasil register
          dispatchSuccess(dispatch, REGISTER_USER, dataBaru);
        })
        .catch((err) => {
          dispatchError(dispatch, err.message);
          alert(err.message);
        });
    }
  };
};

export const loginUser = (email, password) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: LOGIN_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    // sign in
    if ((email, password)) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((success) => {});
    }
  };
};
