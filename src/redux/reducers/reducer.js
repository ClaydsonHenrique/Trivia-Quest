import { combineReducers } from 'redux';
import reducerEmail from './jogo';

const rootReducer = combineReducers({
  email: reducerEmail,
});

export default rootReducer;
