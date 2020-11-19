import React, { useEffect, useState } from 'react';

import styles from './style.module.css';

import NavBar from '../../components/NavBar';
import PostItem from '../../components/PostItem';
import offIcon from '../../assets/images/icons/off.svg';
import makePost from '../../assets/images/icons/makePost.svg';
import establishment from '../../assets/images/icons/establishment.svg';
import WhoToFollow from '../../components/WhoToFollow';
import { Link } from 'react-router-dom';
//import api from '../../services/api';
import {useAuth} from '../../Context/AuthContext';

export default function Home() {
  const { signOut, user, isJuridic } = useAuth();



  function handleSignOut(){
    signOut();
  }


  // let user: IUser;

  // useEffect(()=>{
  //   user = JSON.parse(localStorage.getItem('token')!);
  // }, []);
  return (
    <div id={styles.pagePostList} className="container">
      <NavBar>
        <Link to="/">
          <img src={makePost} alt="Criar um Post"/>
        </Link>
        {
          isJuridic ? (        <Link to="/establishments">
          <img src={establishment} alt="Procurar estabelecimentos"/>
        </Link>) : null
        }
        <Link to="/" onClick={()=>{handleSignOut()}} >
          <img src={offIcon} alt="Sair" />
        </Link>
          <img src={user?.profilePic} alt="Sair" />
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