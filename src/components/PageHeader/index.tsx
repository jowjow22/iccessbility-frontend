import React from 'react';

import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/images/BrandWithNameOrange.svg';
import backIcon from '../../assets/images/icons/back.svg';

import styles from './style.module.css';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { goBack } = useHistory();
  return (
    <header className={styles.pageHeader}>
      <div className={styles.topBarContainer}>
        <button onClick={goBack}>
          <img src={backIcon} alt="Voltar" />
        </button>
        <img src={logoImg} alt="Iccessbility" />
      </div>
      <div className={styles.headerContent}>
        <strong>
          {props.title}
        </strong>
        { props.description && <p>{props.description}</p> }

        {props.children}
      </div>
    </header>
  );
}

export default PageHeader;