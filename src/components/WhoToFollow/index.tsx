import React from 'react';
import styles from  './style.module.css';

export default function WhoToFollow() {
  return (
    <article className={styles.followItem}>
      <header>
        <img src="https://avatars1.githubusercontent.com/u/51102351?s=460&v=4" alt="Jonathan Santos" />
        <div>
          <strong>Jonathan Santos</strong>
          <span>Quimica</span>
        </div>
      </header>
      <footer>
        <button type="button">
          Seguir
        </button>
      </footer>
    </article>
  );
}
