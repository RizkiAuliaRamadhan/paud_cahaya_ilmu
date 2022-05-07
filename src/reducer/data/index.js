import { DELETE_DATA, GET_DATA_SISWA, GET_DATA_GURU } from '../../actions/dataActions';

const initialState = {
  dataSiswaLoading: false,
  dataSiswaResult: false,
  dataSiswaError: false,

  dataGuruLoading: false,
  dataGuruResult: false,
  dataGuruError: false,

  dataDeleteLoading: false,
  dataDeleteResult: false,
  dataDeleteError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATA_SISWA:
      return {
        ...state,
        dataSiswaLoading: action.payload.loading,
        dataSiswaResult: action.payload.data,
        dataSiswaError: action.payload.errorMessage,
      };
    case GET_DATA_GURU:
      return {
        ...state,
        dataGuruLoading: action.payload.loading,
        dataGuruResult: action.payload.data,
        dataGuruError: action.payload.errorMessage,
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
