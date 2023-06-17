import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'
import App from '../App'

const name = 'input-player-name'
const gravatar = 'input-gravatar-email'
const play = 'btn-play'
const settings = 'btn-settings'

test('verifiacando se Tela Login possui elemento, verificando se btn play esta desabilitado', () => {
  renderWithRouterAndRedux(<App /> )
  const inputName = screen.getByTestId(name)
  const imgGravatar = screen.getByTestId(gravatar)
  const btnplay = screen.getByTestId(play)
  const btnsettings = screen.getByTestId(settings)
  expect(inputName).toBeInTheDocument()
  expect(imgGravatar).toBeInTheDocument()
  expect(btnplay).toBeInTheDocument()
  expect(btnsettings).toBeInTheDocument()
  expect(btnplay).toBeDisabled()
})

test('verificando se ao digitar nos inputs o btn play estara habilitado, se clicar no btnplay a pagina é redirecionada pra a pagina de jogo', async () => {
  const { history } = renderWithRouterAndRedux(<App />)
  const inputName = screen.getByTestId(name)
  const imgGravatar = screen.getByTestId(gravatar)
  const btnplay = screen.getByTestId(play)

  fireEvent.change(imgGravatar, { target: { value: 'saa@gmail.com' } })
  fireEvent.change(inputName, { target: { value: 'saaaa' } })

  expect(btnplay).toBeEnabled()
  fireEvent.click(btnplay)
  await waitFor(() => {
    expect(history.location.pathname).toBe('/jogo')
  })
})

test('verificando se clicar no btn sttings é redirecionado para a pagina de configuracao ',  async () => {
 const { history } = renderWithRouterAndRedux(<App />)
  const btnsettings = screen.getByTestId(settings)
  fireEvent.click(btnsettings)
  await waitFor(() => {
    expect(history.location.pathname).toBe('/settings')
  })
})
