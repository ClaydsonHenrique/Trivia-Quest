export const GET_APP = 'GET_APP';
export const addEmail = (token) => ({
  type: GET_APP,
  payload: token,
});

export const ADD_NAME = 'ADD_NAME';
export const addname = (token) => ({
  type: ADD_NAME,
  payload: token,
});

export const ADD_SCORE = 'ADD_SCORE';
export const addscore = (token) => ({
  type: ADD_SCORE,
  payload: token,
});

export const ADD_TIME = 'ADD_SCORE';
export const addtime = (time) => ({
  type: ADD_TIME,
  payload: time,
});
