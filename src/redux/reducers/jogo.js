import { GET_APP, ADD_NAME } from '../action/index';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const reducerEmail = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_APP:
    return {
      ...state,
      email: action.payload,
    };
  case ADD_NAME:
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
};

export default reducerEmail;
