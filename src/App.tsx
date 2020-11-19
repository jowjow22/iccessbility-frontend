import React from 'react';
import Routes from './routes/routes';
import './assets/styles/global.css';
import {AuthProvider} from './Context/AuthContext';

function App() {


  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
