import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';

import styles from './style.module.css';

interface DelSomethingParams{
  thingToDel: string;
  userID: string;
  thingID: string;
}

export default function DelSomething(){
    const history = useHistory();
    const params = useParams<DelSomethingParams>();
  
  return (
    <div id={styles.pageDelSomething} className="container">
    <article className={styles.delSomethinConfirm}>
      <header>
        {
          params.thingToDel === 'establishment' ? <h3>Certeza que deseja apagar esse estabelecimento?</h3> : <h3>Certeza que deseja apagar esse post?</h3>
        }
        
      </header>
      <footer>
        <button type="button" className={styles.confirm} onClick={async ()=>{
          await api.delete(`${params.thingToDel}/${params.userID}/${params.thingID}`).then(()=>{
            history.goBack();
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

