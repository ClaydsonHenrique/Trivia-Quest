import { combineReducers } from 'redux';
import reducerEmail from './jogo';
import reducerTimer from './timer';

const rootReducer = combineReducers({
  email: reducerEmail,
  player: reducerTimer,
});

export default rootReducer;
