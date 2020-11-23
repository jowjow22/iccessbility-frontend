import React, { FormEvent, useState, useEffect } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';

import styles from './style.module.css';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import TypeImage from '../../components/TypeImage';
import ibge from '../../services/ibge';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export default function UpdateUser() {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [sgState, setSgState] = useState('');
  const [city, setCity] = useState('');
  const [adress, setAdress] = useState('');
  const [birth, setBirth] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [phone, setPhone] = useState('')
  const [profilePic, setProfilePic] = useState();
  const [coverPic, setCoverPic] = useState();
  const [bio, setBio] = useState('');
  let stateOption: any = [];
  let cityOption: any = [];
  const [stateOptions, setStateOptions] = useState<any>();
  const [cityOptions, setCityOptions] = useState<any>();
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    ibge.get('estados').then(res =>{
      const estados: Array<any> = res.data;
      
      estados.map((estado) => {
        stateOption.push({ value: estado.id, label: estado.sigla });
        return stateOption;
      });

      setStateOptions(stateOption);
      
      console.log(stateOptions);
    })
  }, []);

  useEffect(()=>{
    (async ()=>{
      const userData = (await api.get(`user/${user?.id}`)).data;

      setName(userData.nm_usuario);
      setBirth(userData.dt_nascimento);
      setAdress(userData.nm_endereco);
      setCpfCnpj(userData.nm_cpf_cnpj);
      setPhone(userData.nr_telefone);
      setBio(userData.ds_bio);
      setCity(userData.nm_cidade);
      setSgState(userData.sg_estado);
    })()
  }, [])

  async function searchCity(id: any){
    await ibge.get(`estados/${id}/municipios`).then(res =>{
      const cidades: Array<any> = res.data;
      
      cidades.map((cidade) => {
        cityOption.push({ value: cidade.nome, label: cidade.nome });
        return cityOption;
      });
      
      setCityOptions(cityOption);
    })
  }

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  function handleCreateUser(e: FormEvent){
    e.preventDefault();
    api.patch(`user/${user?.id}`, {
      nome: name,
      nascimento: birth,
      foto: profilePic,
      endereco: adress,
      cidade: city,
      estado: sgState,
      cpf_cnpj: cpfCnpj,
      bio,
      capa: coverPic,
      telefone: phone
    }).then(()=>{
      alert('Perfil atualizado com sucesso');
      history.push('/home');

    }).catch((err)=>{
      console.log(err);
    })
  }


  return (
    <div id={styles.pagePostList} className="container">
      <PageHeader
        title="Bem vindo(a) cadastre-se para entrar na plataforma!"
        description="Preencha este formulário para poder acessar a plataforma"
      />
      <main>
        <form onSubmit={handleCreateUser} >
        <fieldset>
          <legend>Seus Dados</legend>
          <Input 
          name="name" 
          label="Nome" 
          value={name} 
          onChange={(e)=>{ setName(e.target.value) }} required />
          <Input type="date" name="birth" label="Nascimento" value={birth} onChange={(e)=>{setBirth(e.target.value)}} required/>
          <Input name="adress" label="Endereço" value={adress} onChange={(e)=>{setAdress(e.target.value)}} required/>
          {
            stateOptions && (
              <Select 
              name="state" 
              label="Estado"
              options={stateOptions!}
              value={state}
              onChange={(e)=>{
                const estado = e.target.options[e.target.selectedIndex].text
                setState(e.target.value)
                setSgState(estado)
                searchCity(e.target.value)
    
                
              }}
               />
            )
          }

          {
          cityOptions && (
          <Select 
          name="city" 
          label="Cidade"
          options={cityOptions!}
          value={city}
          onChange={(e)=>{ setCity(e.target.value)}}  
           /> 
            )
          }

          <Input 
          name="cpf-cnpj"
          label="CPF/CNPJ"
          value={cpfCnpj}
          onChange={(e)=>{ setCpfCnpj(e.target.value) }} 
          required
          />
          <Input 
          name="phone" 
          label="Telefone(sem espaço ou caractere especial)"
          value={phone}
          onChange={(e)=>{ setPhone(e.target.value) }}
          required
          />
        </fieldset>
        

        <fieldset>
          <legend>Dados de Perfil</legend>
          <Textarea 
          name="bio" 
          label="Biografia"
          value={bio}
          onChange={(e)=>{ setBio(e.target.value) }}
          required
          />
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