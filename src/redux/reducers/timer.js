import { ADD_SCORE } from '../action';

const INITIAL_STATE = {
  score: 0,
};

const reducerTimer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default reducerTimer;
