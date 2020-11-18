import React, { FormEvent, useState, useEffect } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';

import styles from './style.module.css';
import Select from '../../components/Select';
import TypeImage from '../../components/TypeImage';
import ibge from '../../services/ibge';

import Map from '../../components/Map';
import mapIcon from '../../components/Map/iccessMapIcon';
import { Marker } from 'react-leaflet';

export default function SignIn() {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [establishmentPic, setEPic] = useState();
  const [eType, setEType] = useState('');
  let option: any = [];
  const [options, setOptions] = useState(option);

  useEffect(() => {
    ibge.get('estados').then(res =>{
      const estados: Array<any> = res.data;
      
      estados.map((estado) => {
        options.push({ value: estado.sigla, label: estado.nome });
        return options;
      });

      setOptions(options);
      
      console.log(options);
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
      establishmentPic,
      eType
    });
  }


  return (
    <div id={styles.pagePostList} className="container">
      <PageHeader
        title="Cadastro de Estabelecimento"
        description="Preencha este formulário para cadastrar seu estabelecimento"
      />
      <main>
        <form onSubmit={handleCreateClass} >
        <fieldset>
          <legend>Dados do estabelecimento</legend>
          <Input 
          name="name" 
          label="Nome" 
          value={name} 
          onChange={(e)=>{ setName(e.target.value) }} />

          <Select 
          name="state" 
          label="Estado"
          options={options}
          value={state}
          onChange={(e)=>{ setState(e.target.value)}}
           />

          <Select 
          name="city" 
          label="Cidade"
          options={[
            { value:'Peruíbe', label: 'Peruíbe' },
            { value:'Itanhaém', label: 'Itanhaém' }
          ]}
          value={city}
          onChange={(e)=>{ setCity(e.target.value)}}
           />

          <Select 
          name="eType" 
          label="Tipo de Estabelecimento"
          options={[
            { value:'Peruíbe', label: 'Peruíbe' },
            { value:'Itanhaém', label: 'Itanhaém' }
          ]}
          value={eType}
          onChange={(e)=>{ setEType(e.target.value)}}
           />

        </fieldset>
        

        <fieldset>
          <legend>Imagem e Localização</legend>
          <TypeImage 
          type="file" 
          name="profile-image" 
          label="Foto de Perfil"
          value=""
          onChange={async (e)=>{ 
            const file = e.target.files![0];
            const base64: any = await convertBase64(file);
            setEPic(base64);
          }}
          />
          <Map style={{ width: '100%', height: 280, borderRadius: 10 }}>
              <Marker interactive={false} icon={mapIcon} position={[-24.2778112, -46.9630976]} />
          </Map>
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