import React from 'react';

import styles from './style.module.css';

import NavBar from '../../components/NavBar';
import PostItem from '../../components/PostItem';
import offIcon from '../../assets/images/icons/off.svg';
import makePost from '../../assets/images/icons/makePost.svg';
import establishment from '../../assets/images/icons/establishment.svg';
import WhoToFollow from '../../components/WhoToFollow';
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div id={styles.pagePostList} className="container">
      <NavBar>
        <Link to="/">
          <img src={makePost} alt="Criar um Post"/>
        </Link>
        <Link to="/establishment">
          <img src={establishment} alt="Procurar estabelecimentos"/>
        </Link>
        <Link to="/">
          <img src={offIcon} alt="Sair"/>
        </Link>

      </NavBar>
      <div className={styles.mainBody}>
      <main>

        <PostItem />
        <PostItem />

      </main>

      <div className={styles.sideBar}>

        <WhoToFollow />
        <WhoToFollow />

      </div>
      </div>
    </div>
  );
}