import { ADD_SCORE, ADD_ASSERTIONS } from '../action';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const reducerTimer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case ADD_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default reducerTimer;
