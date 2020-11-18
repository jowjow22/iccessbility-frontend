import React from 'react';
import PageHeader from '../../components/PageHeader';

import styles from './style.module.css';

import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';

export default function SignIn() {
  return (
    <div id={styles.pagePostList} className="container">
      <PageHeader title=""/>
      <main>
        <fieldset>
          <legend>Bem vindo(a) de volta!</legend>

          <Input name="cpf-cnpj" className={styles.inputBlock} label="CPF/CNPJ"/>
          <Input type="password" className={styles.inputBlock} name="pass" label="Senha"/>

        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso Importante"/>
            Importante! <br />
            Preencha todos os campos
          </p>
          <button type="button">
              Salvar cadastro
          </button>
        </footer>
      </main>
    </div>
  );
}