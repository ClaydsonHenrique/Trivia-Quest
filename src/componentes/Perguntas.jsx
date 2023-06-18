import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addscore, addassertions } from '../redux/action';

const seconds = 1000;

class Perguntas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
      questionIndex: 0,
      results: [],
      timerId: null,
      disabled: false,
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await this.getAnswer();
    this.startTimer();
    dispatch(addscore(0));
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  getAnswer = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    const { results } = data;
    const { history } = this.props;
    if (results.length === 0) {
      history.push('/');
      localStorage.clear();
    }
    this.setState({ results });
  };

  renderAnswer = () => {
    const { questionIndex, results } = this.state;

    const number = 4;
    if (questionIndex <= number) {
      const { category, question } = results[questionIndex];
      const correctQuestion = results[questionIndex].correct_answer;
      const incorrectAnswers = results[questionIndex].incorrect_answers;
      const allAnswers = [...this.renderAnswersIncorrect(incorrectAnswers),
        this.renderAnwerCorrect(correctQuestion)];

      return (
        <div>
          <h1 data-testid="question-category">{category}</h1>
          <h3 data-testid="question-text">{question}</h3>
          <div data-testid="options">
            {allAnswers.map((answer) => answer)}
          </div>
        </div>
      );
    }
    const { name, score } = this.props;
    const img = localStorage.getItem('imgGravatar');
    const rankingString = localStorage.getItem('ranking');
    let rankingLocal = [];

    if (rankingString) {
      rankingLocal = JSON.parse(rankingString);
    }

    const arrayRanking = { name, score, picture: img };
    rankingLocal.push(arrayRanking);
    const stringfyRanking = JSON.stringify(rankingLocal);
    localStorage.setItem('ranking', stringfyRanking);

    const { history } = this.props;
    history.push('/feedback');
  };

  renderAnwerCorrect = (param) => {
    const { disabled } = this.state;
    const borda = disabled ? { border: '3px solid rgb(6, 240, 15)' } : {};
    return (
      <button
        style={ borda }
        disabled={ disabled }
        onClick={ this.handleClick }
        className="correta"
        data-testid="correct-answer"
      >
        { param}
      </button>
    );
  };

  renderAnswersIncorrect = (param) => param.map((btn, index) => {
    const { disabled } = this.state;
    const borda = disabled ? { border: '3px solid red' } : {};
    return (
      <button
        style={ borda }
        disabled={ disabled }
        className="errada"
        onClick={ this.handleClick }
        key={ index }
        data-testid={ `wrong-answer-${index}` }
      >
        {btn}

      </button>
    );
  });

  handleClick = ({ target }) => {
    const { questionIndex, results, time } = this.state;
    const { dispatch, score, assertions } = this.props;
    const correta = results[questionIndex].correct_answer;
    const dificuldade = results[questionIndex].difficulty;
    const nivel = { hard: 3, medium: 2, easy: 1 };
    if (target.innerText === correta) {
      const magicNumber = 10;
      const scores = (magicNumber + (time * nivel[dificuldade]));
      const somaScore = score + scores;
      dispatch(addscore(somaScore));
      const somaAssertions = assertions + 1;
      dispatch(addassertions(somaAssertions));
      console.log(somaAssertions);
    }
    this.setState({ disabled: true });
    this.stopTimer();
  };

  startTimer = () => {
    const timerId = setTimeout(this.handleTimeout, seconds);
    this.setState({ timerId });
  };

  stopTimer = () => {
    const { timerId } = this.state;
    clearTimeout(timerId);
  };

  handleTimeout = () => {
    const { time } = this.state;

    this.setState({ time: time - 1 }, () => {
      if (time <= 1) {
        this.setState(
          { disabled: true },
        );
        this.stopTimer();
      } else if (time > 0) {
        this.setState(
          { disabled: false },
        );
      }
    });

    this.startTimer();
  };

  nextQuestion = () => {
    const { questionIndex, disabled } = this.state;
    if (disabled) {
      this.setState({ questionIndex: questionIndex + 1, time: 30, disabled: false });
    }
    this.startTimer();
  };

  render() {
    const { results, time, disabled } = this.state;
    return (
      <div>
        <h3>{time}</h3>
        {results.length > 0 ? (
          this.renderAnswer(results)
        ) : (
          'Carregando...'
        )}
        {disabled ? (
          <button
            onClick={ this.nextQuestion }
            data-testid="btn-next"
            className="next"
          >
            Next

          </button>
        ) : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.email.name,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Perguntas);
Perguntas.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
