import React, { FormEvent, useState, useEffect } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';

import styles from './style.module.css';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import TypeImage from '../../components/TypeImage';
import ibge from '../../services/ibge';

export default function SignIn() {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [userType, setUserType] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [profilePic, setProfilePic] = useState();
  const [coverPic, setCoverPic] = useState();
  const [bio, setBio] = useState('');
  let stateOption: any = [];
  let cityOption: any = [];
  const [stateOptions, setStateOptions] = useState();

  useEffect(() => {
    ibge.get('estados').then(res =>{
      const estados: Array<any> = res.data;
      
      estados.map((estado) => {
        stateOption.push({ value: estado.id, label: estado.nome });
        return stateOption;
      });

      setStateOptions(stateOption);
      
      console.log(stateOptions);
    })
  }, []);

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


  function handleCreateClass(e: FormEvent){
    e.preventDefault();

    console.log({
      name,
      state,
      city,
      userType,
      cpfCnpj,
      phone,
      pass,
      profilePic,
      coverPic,
      bio
    });
  }


  return (
    <div id={styles.pagePostList} className="container">
      <PageHeader
        title="Bem vindo(a) cadastre-se para entrar na plataforma!"
        description="Preencha este formulário para poder acessar a plataforma"
      />
      <main>
        <form onSubmit={handleCreateClass} >
        <fieldset>
          <legend>Seus Dados</legend>
          <Input 
          name="name" 
          label="Nome" 
          value={name} 
          onChange={(e)=>{ setName(e.target.value) }} />
          <Input type="date" name="birth" label="Nascimento"/>
          <Input name="adress" label="Endereço"/>

          <Select 
          name="userType" 
          label="Tipo de Pessoa"
          options={[
            { value:'Física', label: 'Física' },
            { value:'Jurídica', label: 'Jurídica' }
          ]}
          value={userType}
          onChange={(e)=>{ setUserType(e.target.value) }}
          />
          {
            stateOptions && (
              <Select 
              name="state" 
              label="Estado"
              options={stateOptions!}
              value={state}
              onChange={(e)=>{
    
                setState(e.target.value)
    
                
              }}
               />
            )
          }


          {/* <Select 
          name="city" 
          label="Cidade"
          options={cityOptions}
          value={city}
          onChange={(e)=>{ setCity(e.target.value)}}
           /> */}

          <Input 
          name="cpf-cnpj"
          label="CPF/CNPJ"
          value={cpfCnpj}
          onChange={(e)=>{ setCpfCnpj(e.target.value) }} 
          />
          <Input 
          name="phone" 
          label="Telefone"
          value={phone}
          onChange={(e)=>{ setPhone(e.target.value) }}
          />
          <Input 
          type="password" 
          name="pass" 
          label="Senha"
          value={pass}
          onChange={(e)=>{ setPass(e.target.value) }}
          />
        </fieldset>
        

        <fieldset>
          <legend>Dados de Perfil</legend>
          <TypeImage 
          type="file" 
          name="profile-image" 
          label="Foto de Perfil"
          value=""
          onChange={async (e)=>{ 
            const file = e.target.files![0];
            const base64: any = await convertBase64(file);
            setProfilePic(base64);
          }}
          />
          <TypeImage 
          type="file" 
          name="cover-image" 
          label="Foto de Capa"
          value=""
          onChange={async (e)=>{ 
            const file = e.target.files![0];
            const base64: any = await convertBase64(file);
            setCoverPic(base64);
           }}
          />
          <Textarea 
          name="bio" 
          label="Biografia"
          value={bio}
          onChange={(e)=>{ setBio(e.target.value) }}
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