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

test('verificando feedback contem os valores corretos do state', async () => {
  renderWithRouterAndRedux(<App />, initialState, initialEntries);

  const score = screen.getByTestId("feedback-total-score");
  const acertos = screen.getByTestId("feedback-total-question");
  const name = screen.getByTestId('header-player-name');
  const text = screen.getByTestId('feedback-text');
  const btnRanking = screen.getByTestId("btn-ranking");
  const btnAgain = screen.getByTestId("btn-play-again");
  expect(btnRanking).toBeInTheDocument();
  expect(btnAgain).toBeInTheDocument();
  expect(score).toBeInTheDocument();


  expect(score.textContent).toBe('120');
  expect(acertos.textContent).toBe('2');
  expect(name.textContent).toBe('aaaaa')
  expect(text.textContent).toBe('Could be better...')

});


test('verificando se ao clicar no botao playAgain redireciona para a pagina Login', async () => {
  const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);
  const btnAgain = screen.getByTestId("btn-play-again");
  fireEvent.click(btnAgain)
  await waitFor(() => {
    expect(history.location.pathname).toBe('/')
  })
})

test('verificando se ao clicar no botao ranking redireciona a pagina para a rota ranking', async () => {
  const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

  const btnRanking = screen.getByTestId("btn-ranking");
  fireEvent.click(btnRanking)
  await waitFor(() => {
    expect(history.location.pathname).toBe('/ranking')
  })
})
const stateInitial = {
  email: {
    email: 'aaaa@gmail.com',
    name: 'aaaaa',
  },
  player: {
    score: 120,
    assertions: 4,
  }
}
test('verificando se score for maior que tres retorna um texto diferente ', () => {
  const { history } = renderWithRouterAndRedux(<App />, stateInitial, initialEntries);
  const text = screen.getByTestId('feedback-text');
  expect(text.textContent).toBe('Well Done!')
})
