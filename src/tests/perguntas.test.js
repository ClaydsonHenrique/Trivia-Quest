import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'
import App from '../App';

const initialEntries = '/feedback';
const initialState = {
  email: {
    email: 'aaaa@gmail.com',
    name: 'aaaaa',
  },
  player: {
    score: 120,
    assertions: 2,
  }
};
