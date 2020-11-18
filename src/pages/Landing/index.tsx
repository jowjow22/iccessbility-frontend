import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoText from '../../assets/images/BrandWithNameOrange.svg';
import landingImg from '../../assets/images/landing.svg';

import signInIcon from '../../assets/images/icons/signIn.svg';
import signUpIcon from '../../assets/images/icons/signUp.svg';

import './style.css';
import api from '../../services/api';

export default function Home() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    api.get('user').then(res =>{
      const total = res.data.length;

      setTotalUsers(total);
    })
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoText} alt="Iccessbility" />
          <h2>Conectando você à acessbilidade</h2>
        </div>
        <img src={landingImg} alt="Iccessbility Platform" className="landing-image" />

        <div className="buttons-container">
          <Link to="/signIn" className="sign-in">
            <img src={signInIcon} alt="Fazer Login" />
            Login
          </Link>
          <Link to="/signUp" className="sign-up">
            <img src={signUpIcon} alt="Cadastrar-se" />
            Cadastre-se
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalUsers} usuários na plataforma 🧡
        </span>
      </div>
    </div>
  );
}