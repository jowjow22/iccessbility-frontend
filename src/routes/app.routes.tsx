import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Establishments from '../pages/Establishments';
import Establishment from '../pages/Establishment';
import CreateEstablishment from '../pages/CreateEstablishments';
import ComposePost from '../pages/ComposePost';
import UserProfile from '../pages/UserProfile';

interface AppRoutesProps {
  userType: string | undefined;
}

const AppRoutes: React.FC<AppRoutesProps> = (props) => {
  return props.userType == 'Jurídica' ? 
  (
  <BrowserRouter>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/establishments" exact component={Establishments} />
      <Route path="/establishment/:id" exact component={Establishment} />
      <Route path="/create" exact component={CreateEstablishment} />
      <Route path="/composePost" exact component={ComposePost} />
      <Route path="/profile" exact component={UserProfile} />
    </Switch>
  </BrowserRouter>
) : (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/establishments" exact component={Establishments} />
        <Route path="/establishment/:id" exact component={Establishment} />
        <Route path="/composePost" exact component={ComposePost} />
        <Route path="/profile" exact component={UserProfile} />
      </Switch>
  </BrowserRouter>
);
};

export default AppRoutes;