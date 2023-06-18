import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const hash = MD5(email);
    const string = hash.toString();
    localStorage.setItem('imgGravatar', `https://www.gravatar.com/avatar/${string}`);
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
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
