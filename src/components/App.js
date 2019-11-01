import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

import LoginForm from './Login'
import SignupForm from './Signup'

import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
      </Switch>
    </div>
  );
}

export default App;
