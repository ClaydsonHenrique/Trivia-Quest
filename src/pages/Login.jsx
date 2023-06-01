import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail, addname } from '../redux/action';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateInputs);
  };

  validateInputs = () => {
    const { email, name } = this.state;
    const number = 3;
    if (email.length >= number && name.length >= number) {
      this.setState({ disabled: false });
    }
  };

  getToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const { token } = data;
    console.log(token);
    localStorage.setItem('token', token);
    return token;
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    dispatch(addEmail(email));
    dispatch(addname(name));
    const token = await this.getToken();
    localStorage.setItem('token', token);
    history.push('/jogo');
  };

  render() {
    const { history } = this.props;
    const { email, name, disabled } = this.state;
    return (
      <div>
        <label htmlFor="">
          <input
            type="text"
            name="name"
            value={ name }
            id="nome"
            placeholder="nome"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="">
          <input
            value={ email }
            type="email"
            name="email"
            placeholder="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          onClick={ this.handleClick }
          disabled={ disabled }
          data-testid="btn-play"
        >
          Play

        </button>
        <button
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          configuração

        </button>
      </div>
    );
  }
}
export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
