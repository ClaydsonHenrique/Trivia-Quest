import { GET_APP } from '../action';

const INITIAL_STATE = {
  user: { email: '' },
};

const reducerEmail = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_APP:
    return {
      ...state.user,
      email: action.payload,

    };
  default:
    return state;
  }
};
export default reducerEmail;
