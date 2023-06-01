import { GET_APP, ADD_NAME, ADD_SCORE } from '../action/index';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
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
  case ADD_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default reducerEmail;
