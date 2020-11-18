import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing/index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Establishment from './pages/Establishment';
import CreateEstablishment from './pages/CreateEstablishments';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/establishment" exact component={Establishment} />
        <Route path="/establishment/create" component={CreateEstablishment} />
      </Switch>
    </BrowserRouter>
  );
}