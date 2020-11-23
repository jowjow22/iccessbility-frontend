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
import {LeafletMouseEvent} from 'leaflet';
import api from '../../services/api';
import { useAuth } from '../../Context/AuthContext';
import { useHistory } from 'react-router-dom';
//
export default function SignIn() {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [image, setEPic] = useState();
  const [eType, setEType] = useState('');
  let stateOption: any = [];
  let cityOption: any = [];
  let eTypeOption: any =[];
  const [stateOptions, setStateOptions] = useState<any>();
  const [cityOptions, setCityOptions] = useState<any>();
  const [sgState, setSgState] = useState('');
  const [position, setPosition] = useState<any>({ latitude: 0, longitude: 0 });
  const [eTypes, setETypes] = useState<any>();
  const [currentLatitude, setCurrentLatitude] = useState<any>();
  const [currentLongitude, setCurrentLongitude] = useState<any>();
  const { user } = useAuth();
  const history = useHistory();

  useEffect(()=>{
    (async ()=>{
      const etypes: any = (await api.get('eType')).data;
      etypes.map((etype: any)=>{
        eTypeOption.push({ value: etype.cd_tp_estabelecimento, label: etype.nm_tipo });
        return eTypeOption;
      });
      setETypes(eTypeOption);
    })()
  }, []);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (pos)=>{
         let latitude = pos.coords.latitude; let longitude = pos.coords.longitude;
         setCurrentLatitude(latitude);
         setCurrentLongitude(longitude);
        });
  }, []);

  useEffect(() => {
    ibge.get('estados').then(res =>{
      const estados: Array<any> = res.data;
      
      estados.map((estado) => {
        stateOption.push({ value: estado.id, label: estado.sigla });
        return stateOption;
      });

      setStateOptions(stateOption);
    })
  }, []);

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

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }


  async function handleCreateEstablishment(e: FormEvent){
    e.preventDefault();

    await api.post('establishment',{
      name,
      city,
      image,
      state: sgState,
      latitude: position.latitude,
      longitude: position.longitude,
      totalRating: 0.00,
      idUser: user?.id,
      idEtype: eType
    }).then(()=>{
      alert('cadastrado com sucesso');
      history.push(`/establishment/create/accessbility`);
    }).catch(()=>{
      alert('erro ao cadastrar')
    })
  }


  return (
    <div id={styles.pagePostList} className="container">
      <PageHeader
        title="Cadastro de Estabelecimento"
        description="Preencha este formulário para cadastrar seu estabelecimento"
      />
      <main>
        <form onSubmit={handleCreateEstablishment} >
        <fieldset>
          <legend>Dados do estabelecimento</legend>
          <Input 
          name="name" 
          label="Nome" 
          value={name} 
          onChange={(e)=>{ setName(e.target.value) }} />
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
              required
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
          required
           /> 
            )
          }

        </fieldset>
        

        <fieldset>
          <legend>Imagem e Localização</legend>
          <TypeImage 
          type="file" 
          name="profile-image" 
          label="Foto do estabelecimento"
          value=""
          onChange={async (e)=>{ 
            const file = e.target.files![0];
            const base64: any = await convertBase64(file);
            setEPic(base64);
          }}
          />{
            currentLatitude && currentLongitude &&
            <Map style={{ width: '100%', height: 280, borderRadius: 10 }} center={[currentLatitude, currentLongitude]} zoom={16} onclick={handleMapClick}>
            {
              position.latitude != 0 && <Marker interactive={false} icon={mapIcon} position={[ position.latitude, position.longitude]} />
            }
          </Map>
          }
            {
              eTypes &&
              <Select 
              name="eType" 
              label="Tipo de Estabelecimento"
              options={eTypes}
              value={eType}
              onChange={(e)=>{ setEType(e.target.value)}}
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