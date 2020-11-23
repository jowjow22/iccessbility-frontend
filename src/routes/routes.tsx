import React from 'react';

import {useAuth} from '../Context/AuthContext';


import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';


export default function Routes() {
  const { signed, loading, user } = useAuth();
  
  if(loading){
    return <h1>Loading...</h1>;
  }
  signed ? window.location.href = `${window.location.host}/home` : window.location.href = `${window.location.host}/signIn`;
  return signed ? <AppRoutes userType={user?.personType} /> : <AuthRoutes />;
}