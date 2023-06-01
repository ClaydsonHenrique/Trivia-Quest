import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    console.log(email.email);
    const hash = MD5(email);
    const string = hash.toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${string}` }
          alt="Perfil do usuário"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.email.email,
  name: state.email.name,
  score: state.email.score,
});

export default connect(mapStateToProps)(Header);