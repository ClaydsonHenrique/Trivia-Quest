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
      allAnswe: [],
      question: '',
      category: '',

      // randomAnswer: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.getAnswer();
    dispatch(addscore(0));
    this.startTimer();

    // this.shuffleArray();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { questionIndex, results } = this.state;
    if (prevState.questionIndex !== questionIndex) {
      this.renderAnswer(results);
    }
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
    if (!results || results.length === 0) {
      history.push('/');
      localStorage.clear();
    }
    this.renderAnswer(results);
    this.setState({ results });
  };

  renderAnswer = (results) => {
    const { questionIndex } = this.state;
    console.log('render');
    const number = 4;
    if (questionIndex <= number && results.length > 0) {
      const { category, question } = results[questionIndex];
      const correctQuestion = results[questionIndex].correct_answer;
      const incorrectAnswers = results[questionIndex].incorrect_answers;
      const btnAnswers = incorrectAnswers.map(
        (answer) => ({ value: answer, correct: false }),
      );
      btnAnswers.push({ value: correctQuestion, correct: true });
      const shuffleArray = this.shuffleArray(btnAnswers);
      this.setState({ category, question, allAnswe: shuffleArray });
    } else if (questionIndex > number) {
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
    }
  };

  handleClick = ({ target }) => {
    const { questionIndex, results, time, disabled } = this.state;
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
    console.log(disabled);
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

  shuffleArray(allAnswe) {
    if (allAnswe.length > 0) {
      const shuffledArray = [...allAnswe];
      for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    }
  }

  render() {
    const { results, time, disabled, question, category, allAnswe } = this.state;
    const bordaGreen = disabled ? { border: '3px solid rgb(6, 240, 15)' } : {};
    const bordaRed = disabled ? { border: '3px solid red' } : {};
    return (
      <div>
        <h3>{time}</h3>
        {results.length > 0 && question && category ? (
          <div>
            <h1 data-testid="question-category">{category}</h1>
            <h3 data-testid="question-text">{question}</h3>
            <div data-testid="answer-options">
              {allAnswe.map((answer, index) => (
                <button
                  key={ index }
                  style={ answer.correct ? bordaGreen : bordaRed }
                  disabled={ disabled }
                  onClick={ this.handleClick }
                  data-testid={ answer.correct ? 'correct-answer'
                    : 'wrong-answer-' }
                >
                  {answer.value}
                </button>
              ))}
            </div>
          </div>
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
