import React, { Component } from 'react';
import Header from '../componentes/Header';
import Perguntas from '../componentes/Perguntas';

export default class Jogo extends Component {
  render() {
    return (
      <div>
        <h1>jogo</h1>
        <Header />
        <Perguntas />
      </div>
    );
  }
}
