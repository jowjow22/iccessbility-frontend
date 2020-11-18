import React from 'react';
import styles from './style.module.css';
import interestIcon from '../../assets/images/icons/interest.svg';

export default function PostItem() {
  return (
    <article className={styles.postItem}>
      <header>
        <img src="https://avatars1.githubusercontent.com/u/51102351?s=460&v=4" alt="Jonathan Santos" />
        <div>
          <strong>Jonathan Santos</strong>
          <span>Quimica</span>
        </div>
      </header>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.
      </p>
      <div className={styles.postImage}>
        <img src="https://avatars1.githubusercontent.com/u/51102351?s=460&v=4" alt="Post" />
      </div>
      <footer>
        <p>
          Preço/Hora
          <strong>
            R$ 80,00
          </strong>
        </p>
        <button type="button">
          <img src={interestIcon} alt="Interessado" />
          Tenho Interesse!
        </button>
      </footer>
    </article>
  );
}
