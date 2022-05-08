import { DELETE_DATA, GET_DATA } from '../../actions/dataActions';

const initialState = {
  dataLoading: false,
  dataResult: false,
  dataError: false,

  dataDeleteLoading: false,
  dataDeleteResult: false,
  dataDeleteError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        dataLoading: action.payload.loading,
        dataResult: action.payload.data,
        dataError: action.payload.errorMessage,
      };
    case DELETE_DATA:
      return {
        ...state,
        dataDeleteLoading: action.payload.loading,
        dataDeleteResult: action.payload.data,
        dataDeleteError: action.payload.errorMessage,
      };

    default:
      return state;
      break;
  }
}
