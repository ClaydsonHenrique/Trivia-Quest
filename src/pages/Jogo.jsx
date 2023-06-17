import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import Perguntas from '../componentes/Perguntas';

export default class Jogo extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1>jogo</h1>
        <Header />
        <Perguntas history={ history } />
      </div>
    );
  }
}
Jogo.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
