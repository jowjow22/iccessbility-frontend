import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/BrandWithNameOrange.svg';

import styles from './styles.module.css';

import {FaBars} from 'react-icons/fa';

interface NavBarProps {
}

const NavBar: React.FC<NavBarProps> = (props) => {
  return (
    <header className={styles.NavBar}>
      <div className={styles.topBarContainer}>
        <Link to="/home">
        <img src={logoImg} alt="Iccessbility" />
        </Link>

      <div className={styles.actionButtons} id="actionButtons">
        {
          props.children
        }
      </div>
      <FaBars size={35} color="#fff" display="none" />
      </div>
    </header>
  );
}

export default NavBar;