import { combineReducers } from 'redux';
import reducerEmail from './jogo';

const reducer = combineReducers({
  email: reducerEmail,
});
export default reducer;
