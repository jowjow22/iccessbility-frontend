import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import api from '../../services/api';

import styles from './style.module.css';

export default function DelUser(){
    const history = useHistory();
    const { user, signOut } = useAuth()
  
  return (
    <div id={styles.pageDelSomething} className="container">
    <article className={styles.delSomethinConfirm}>
      <header>
         <h3>Certeza que deseja apagar seu usuário?</h3>
      </header>
      <footer>
        <button type="button" className={styles.confirm} onClick={async ()=>{
          await api.delete(`user/${user?.id}`).then(()=>{
            signOut();
            history.push('/');
          }).catch(()=>{
            alert(`Erro ao deletar`);
          })
        }}>
          Excluir
        </button>
        <button type="button" onClick={()=>{
          history.goBack();
        }} className={styles.cancel}>
          Cancelar
        </button>
      </footer>
    </article>
    </div>
  );
}

