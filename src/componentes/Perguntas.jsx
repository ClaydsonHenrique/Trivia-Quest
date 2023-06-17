import React, { Component } from 'react';
import './perguntas.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addscore } from '../redux/action';

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
    await this.getAnswer();
    this.startTimer();
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
      const styleErro = document.querySelectorAll('.errada');
      styleErro.forEach((styles) => {
        styles.style.border = '1px solid black';
      });
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
    const { history } = this.props;
    console.log('entrou fedback');
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
    const { dispatch, score } = this.props;
    const correta = results[questionIndex].correct_answer;
    console.log(correta);
    const dificuldade = results[questionIndex].difficulty;
    const nivel = { hard: 3, medium: 2, easy: 1 };
    if (target.innerText === correta) {
      const magicNumber = 10;
      const scores = (magicNumber + (time * nivel[dificuldade]));
      const somaScore = score + scores;
      console.log(somaScore);
      dispatch(addscore(somaScore));
      console.log('acertou');
    } else {
      console.log('errou');
    }
    this.setState({ disabled: true });
    const styleErro = document.querySelectorAll('.errada');
    styleErro.forEach((styles) => {
      styles.style.border = '3px solid red';
    });
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
});

export default connect(mapStateToProps)(Perguntas);
Perguntas.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
};
