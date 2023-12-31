import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Confing from './pages/Confing';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/jogo" component={ Jogo } />
          <Route exact path="/settings" component={ Confing } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/ranking" component={ Ranking } />
        </Switch>
      </header>
    </div>
  );
}
