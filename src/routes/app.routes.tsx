import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Establishments from '../pages/Establishments';
import Establishment from '../pages/Establishment';
import CreateEstablishment from '../pages/CreateEstablishments';
import CreateEstablishmentAccessbility from '../pages/CreateEstablishmentsAccessibility';
import ComposePost from '../pages/ComposePost';
import UserProfile from '../pages/UserProfile';
import DelSomething from '../pages/DelSomething';
import DelUser from '../pages/DelUser';
import UpdateUser from '../pages/UpdateUser';
import UpdateEstablishment from '../pages/UpdateEstablishment';

interface AppRoutesProps {
  userType: string | undefined;
}

const AppRoutes: React.FC<AppRoutesProps> = (props) => {
  return props.userType === 'Jurídica' ? 
  (
  <BrowserRouter>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/establishments" exact component={Establishments} />
      <Route path="/establishment/showOne/:id" exact component={Establishment} />
      <Route path="/establishment/create" exact component={CreateEstablishment} />
      <Route path="/delSomething/:thingToDel/:userID/:thingID" exact component={DelSomething} />
      <Route path="/delUser" exact component={DelUser} />
      <Route path="/establishment/create/accessbility" exact component={CreateEstablishmentAccessbility} />
      <Route path="/user/update" exact component={UpdateUser} />
      <Route path="/establishment/update/:eID" exact component={UpdateEstablishment} />
      <Route path="/composePost" exact component={ComposePost} />
      <Route path="/profile/:userID" exact component={UserProfile} />
    </Switch>
  </BrowserRouter>
) : (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/establishments" exact component={Establishments} />
        <Route path="/establishment/showOne/:id" exact component={Establishment} />
        <Route path="/establishment/:id" exact component={Establishment} />
        <Route path="/delSomething/a/:userID/:thingID" exact component={DelSomething} />
        <Route path="/user/update" exact component={UpdateUser} />
        <Route path="/delUser" exact component={DelUser} />
        <Route path="/composePost" exact component={ComposePost} />
        <Route path="/profile/:userID" exact component={UserProfile} />
      </Switch>
  </BrowserRouter>
);
};

export default AppRoutes;