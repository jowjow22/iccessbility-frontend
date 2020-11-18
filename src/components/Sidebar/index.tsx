import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from "../../assets/images/NewLogo.png";

import styles from './style.module.css';

export default function Sidebar() {
  const { goBack } = useHistory();

  return (
    <aside className={styles.sidebar}>
      <img src={mapMarkerImg} alt="Iccessbility" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}