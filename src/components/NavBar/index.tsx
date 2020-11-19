import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/BrandWithNameOrange.svg';

import styles from './styles.module.css';

interface NavBarProps {
}

const NavBar: React.FC<NavBarProps> = (props) => {
  return (
    <header className={styles.NavBar}>
      <div className={styles.topBarContainer}>
        <Link to="/home">
        <img src={logoImg} alt="Iccessbility" />
        </Link>

      <div className={styles.actionButtons}>
        {
          props.children
        }
      </div>
      </div>
    </header>
  );
}

export default NavBar;