import React, { Component } from 'react';
import './perguntas.css';

class Perguntas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verde: '',
      vermelho: '',
      answer: 0,
      correta: '',
      errada: [],
      categoria: '',
      dificuldade: '',
      questao: '',
      type: '',
    };
  }

  async componentDidMount() {
    await this.getAnswer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { answer } = this.state;
    if (prevState.answer !== answer) {
      this.getAnswer();
    }
  }

  getAnswer = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    const { results } = data;

    if (results.length === 0) {
      localStorage.clear();
      history.push('/');
    } else {
      const btns = document.querySelectorAll('.btn');
      btns.forEach((btn) => {
        btn.classList.remove('errada', 'correta');
      });

      this.renderAnswer(results);
    }
  };

  renderAnswer = (results) => {
    const { answer } = this.state;
    if (results[answer]) {
      const {
        category, difficulty, question, type,
      } = results[answer];

      this.setState({
        correta: results[answer].correct_answer,
        errada: results[answer].incorrect_answers,
        categoria: category,
        dificuldade: difficulty,
        questao: question,
        type,
      });
      console.log(results[answer]);
    }
  };

  handleClick = ({ target }) => {
    console.log(target.textContent);
    const { correta, answer } = this.state;
    const btns = document.querySelectorAll('.btn');
    btns.forEach((btn) => {
      console.log(btns);
      if (btn.textContent === correta) {
        btn.classList.add('correta');
      } else if (btn.textContent !== correta) {
        btn.classList.add('errada');
      }
    });

    this.setState({ answer: answer + 1 });
  };

  renderAnserwer = () => {
    const { correta, errada, categoria, dificuldade, questao } = this.state;
    const questoes = [...errada, correta];
    const number = 0.5;
    const questoesAleatoria = questoes.sort(() => Math.random() - number);
    return (
      <div>
        <h1 data-testid="question-category">{categoria}</h1>
        <h3 data-testid="question-text">{questao}</h3>
        {questoesAleatoria.map((erro, index) => (
          <button
            key={ index }
            onClick={ this.handleClick }
            className="btn"
            data-testid={ erro === correta ? 'correct-answer' : `wrong-answer-${index}` }
          >
            {erro}

          </button>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div>{this.renderAnserwer()}</div>
    );
  }
}

export default Perguntas;
