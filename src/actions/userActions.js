export const GET_USER = 'GET_USER';

export const getUser = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USER,
      payload: {
        nis: 's1tis190356',
        password: 'rama2617',
      },
    });
  };
};
