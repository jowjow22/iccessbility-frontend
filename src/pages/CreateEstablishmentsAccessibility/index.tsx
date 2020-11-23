import React, { FormEvent, useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';

import styles from './style.module.css';
import Select from '../../components/Select';
import api from '../../services/api';
import { useAuth } from '../../Context/AuthContext';
import { useHistory } from 'react-router-dom';
//
export default function CreateEstablishmentAccessibility() {
  const { user } = useAuth();
  const history = useHistory();

  const [eOptions, setEOptions] = useState<any>();
  const [aOptions, setAOptions] = useState<any>();

  const [eID, setEID] = useState<any>();
  const [accessID, setAccessID] = useState<any>();


  useEffect(()=>{
    (async ()=>{
      const optionsEstructure = [];
      const estOptions = (await api.get(`establishment/user/${user?.id}`)).data;
      

      for(let i = 0; i <= estOptions.length-1; i++){
        optionsEstructure.push({
          value: estOptions[i].cd_estabelecimento,
          label: estOptions[i].nm_estabelecimento
        });
      }
      setEOptions(optionsEstructure);
    })()
  }, []);

  useEffect(()=>{
    (async ()=>{
      const optionsEstructure = [];
      const estOptions = (await api.get(`accessbility`)).data;
      

      for(let i = 0; i <= estOptions.length-1; i++){
        optionsEstructure.push({
          value: estOptions[i].cd_acessibilidade,
          label: estOptions[i].nm_acessibilidade
        });
      }
      setAOptions(optionsEstructure);
    })()
  }, []);



  async function handleCreateEstablishmentAccess(e: FormEvent){
    e.preventDefault();

    await api.post('eAccessbility',{
      establishmentId: eID,
      aTypesId: accessID
    }).then((res)=>{
      alert(res.data.success);
    }).catch((error)=>{
      alert('Erro ao vincular acessibilidade');
    })
  }


  return (
    <div id={styles.pagePostList} className="container">
      <PageHeader
        title="Cadastro de Estabelecimento"
        description="Cadastre os tipos de acessibilidade disponíveis em seu estabelecimento, caso contrario ele não será listado."
      />
      <main>
        <form onSubmit={handleCreateEstablishmentAccess} >
        <fieldset>
          <legend>Seus Estabelecimentos <br/> ( Para cadastrar mais de uma acessíbilidade, basta continuar na página e cadastrar normalmente)</legend>
          {
            eOptions && (
              <Select 
              name="state" 
              label="Estabelecimento"
              options={eOptions!}
              value={eID}
              onChange={(e)=>{
                setEID(e.target.value);                
              }}
              required
               />
            )
          }


        </fieldset>
        

        <fieldset>
          <legend>Tipos de acessibilidade disponíveis</legend>
            {
              aOptions &&
              <Select 
              name="eType" 
              label="Tipo de Estabelecimento"
              options={aOptions}
              value={accessID}
              onChange={(e)=>{ setAccessID(e.target.value)}}
               />
            }
        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso Importante"/>
            Importante! <br />
            Preencha todos os dados
          </p>
          <button type="submit">
              Salvar cadastro
          </button>
        </footer>
        </form>
      </main>
    </div>
  );
}