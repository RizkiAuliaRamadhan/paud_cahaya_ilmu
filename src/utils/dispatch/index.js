const dispatchLoading = (dispatch, type) => {
  dispatch({
    type,
    payload: {
      loading: true,
      data: '',
      errorMessage: false,
    },
  });
};

const dispatchSuccess = (dispatch, type, data) => {
  dispatch({
    type,
    payload: {
      loading: false,
      data,
      errorMessage: false,
    },
  });
};

const dispatchError = (dispatch, type, error) => {
  dispatch({
    type,
    payload: {
      loading: false,
      data: false,
      errorMessage: error,
    },
  });
};

export { dispatchLoading, dispatchSuccess, dispatchError };
