import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankings: [],
    };
  }

  componentDidMount() {
    const rankingString = localStorage.getItem('ranking');
    const rankingLocal = JSON.parse(rankingString);
    this.setState({ rankings: rankingLocal });
  }

  handleclickLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  renderList = () => {
    const { rankings } = this.state;
    rankings.sort((a, b) => b.score - a.score);

    return (
      <section>
        {rankings.map(({ name, score, picture }, index) => (
          <div key={ index }>
            <img src={ picture } alt="" />
            <p data-testid={ `player-name-${index}` }>{name}</p>
            <p data-testid={ `player-score-${index}` }>{score}</p>
          </div>
        ))}
      </section>
    );
  };

  render() {
    const { rankings } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankings.length > 0 ? this.renderList() : ''}

        <button
          onClick={ this.handleclickLogin }
          data-testid="btn-go-home"
        >
          Home

        </button>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
