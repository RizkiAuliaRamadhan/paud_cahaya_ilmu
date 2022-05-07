import { REGISTER_USER } from '../../actions/authActions';

const initialState = {
  registerLoading: false,
  registerResult: false,
  registerError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registerLoading: action.payload.loading,
        registerResult: action.payload.data,
        registerError: action.payload.errorMessage,
      };

    default:
      return state;
      break;
  }
}
