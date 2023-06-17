import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';

class Feedback extends Component {
  handleclickLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleclickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const magicNumber = 3;
    return (
      <div>
        <h1>feedbackl</h1>
        <Header />
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <h3
          data-testid="feedback-text"
        >
          {assertions < magicNumber ? 'Could be better...' : 'Well Done!'}

        </h3>
        <button
          onClick={ this.handleclickLogin }
          data-testid="btn-play-again"
        >
          Play again

        </button>
        <button
          onClick={ this.handleclickRanking }
          data-testid="btn-ranking"
        >
          Ranking

        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  email: state.email.email,
  name: state.email.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};
