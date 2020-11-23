import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';

import styles from './style.module.css';

import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';


import {useAuth} from '../../Context/AuthContext';


export default function SignIn() {
  const {signed, signIn} = useAuth();
  const history = useHistory();
  

  console.log(signed);
  
  
  const [cpfCpnj, setCpfCnpj] = useState('');
  const [pass, setPass] = useState('');

  function handleLogin(e: FormEvent){
    e.preventDefault();
    signIn(cpfCpnj, pass).then(()=>{
      if(sessionStorage.getItem('@Iccessbility:user')){
        history.push('/home');
        window.location.reload();
      }
    })
  }


  return (
    <div id={styles.pagePostList} className="container">
      <PageHeader title=""/>
      <main>
        <form onSubmit={handleLogin}>
        <fieldset>
          <legend>Bem vindo(a) de volta!</legend>

          <Input name="cpf-cnpj" className={styles.inputBlock} label="CPF/CNPJ" value={cpfCpnj} onChange={(e)=>{
            setCpfCnpj(e.target.value)
          }}/>
          <Input type="password" className={styles.inputBlock} name="pass" label="Senha" value={pass} onChange={(e)=>{
            setPass(e.target.value)
          }}/>

        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso Importante"/>
            Importante! <br />
            Preencha todos os campos
          </p>
          <button type="submit">
              Entrar
          </button>
        </footer>
        </form>
      </main>
    </div>
  );
}