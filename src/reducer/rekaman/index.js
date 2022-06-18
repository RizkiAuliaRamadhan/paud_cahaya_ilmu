import { GET_REKAMANS, UPLOAD_REKAMAN } from '../../actions/rekamanActions';

const initialState = {
  rekamanLoading: false,
  rekamanResult: false,
  rekamanError: false,

  getRekamanLoading: false,
  getRekamanResult: false,
  getRekamanError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPLOAD_REKAMAN:
      return {
        ...state,
        rekamanLoading: action.payload.loading,
        rekamanResult: action.payload.data,
        rekamanError: action.payload.errorMessage,
      };
    case GET_REKAMANS:
      return {
        ...state,
        getRekamanLoading: action.payload.loading,
        getRekamanResult: action.payload.data,
        getRekamanError: action.payload.errorMessage,
      };

    default:
      return state;
      break;
  }
}
