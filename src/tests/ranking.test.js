import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'
import App from '../App';

const initialEntries = '/ranking';
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

const rankingData = [
  { name: 'cafu', score: 10, picture: '' },
  { name: 'joao', score: 20, picture: '' },
];


test('verificando ranking e se ao clicar no botao redireciona para home e se renderiza os items salvo no localStorage', async () => {
localStorage.setItem('ranking', JSON.stringify(rankingData));
 const { history } =renderWithRouterAndRedux(<App /> , initialState,initialEntries)

const title = screen.getByTestId('ranking-title')
const btn = screen.getByTestId('btn-go-home')
const score = screen.getByTestId('player-score-0')
const score1 = screen.getByTestId('player-score-1')
const name = screen.getByTestId('player-score-1')
const name1 = screen.getByTestId('player-score-1')
expect(name).toBeInTheDocument()
expect(name1).toBeInTheDocument()
expect(score).toBeInTheDocument()
expect(score1).toBeInTheDocument()
expect(title).toBeInTheDocument()
expect(btn).toBeInTheDocument()

fireEvent.click(btn)

await waitFor(() => {
expect(history.location.pathname).toBe('/')
})

})

