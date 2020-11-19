import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Establishments from '../pages/Establishments';
import Establishment from '../pages/Establishment';
import CreateEstablishment from '../pages/CreateEstablishments';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/establishments" exact component={Establishments} />
      <Route path="/establishment/:id" exact component={Establishment} />
      <Route path="/create" exact component={CreateEstablishment} />
    </Switch>
  </BrowserRouter>
);

export default AppRoutes;