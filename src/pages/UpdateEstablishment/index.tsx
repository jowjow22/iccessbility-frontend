import React, { FormEvent, useState, useEffect } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';

import styles from './style.module.css';
import Select from '../../components/Select';
import ibge from '../../services/ibge';

import Map from '../../components/Map';
import mapIcon from '../../components/Map/iccessMapIcon';
import { Marker } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import api from '../../services/api';
import { useAuth } from '../../Context/AuthContext';
import { useHistory, useParams } from 'react-router-dom';

interface UpdateEstablishmentParams {
  eID: string;
}
//
export default function UpdateEstablishment() {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
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
  const [establishmentData, setEstablishmentData] = useState<any>([]);
  const { user } = useAuth();
  const params = useParams<UpdateEstablishmentParams>();
  const history = useHistory();

  useEffect(()=>{
    (async ()=>{
      const establishmentDataObject = (await api.get(`establishment/showOne/${Number(params.eID)}`)).data;
      setEstablishmentData(establishmentDataObject);
      setName(establishmentDataObject[0].nm_estabelecimento);
      setSgState(establishmentDataObject[0].sg_estado);
      setCity(establishmentDataObject[0].nm_cidade);
      setPosition({ latitude: establishmentDataObject[0].latitude, longitude: establishmentDataObject[0].longitude });
      setCurrentLatitude(establishmentDataObject[0].latitude);
      setCurrentLongitude(establishmentDataObject[0].longitude );
      setEType(establishmentDataObject[0].id_tp_estabelecimento);

    })()
  }, [])

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

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }


  async function handleCreateEstablishment(e: FormEvent){
    e.preventDefault();

    await api.patch(`establishment/${user?.id}/${params.eID}`,{
      name,
      city,
      state: sgState,
      latitude: position.latitude,
      longitude: position.longitude,
      idEtype: eType
    }).then(()=>{
      alert('Estabelecimento Atualizado com sucesso');
      history.push(`/home`);
    }).catch(()=>{
      alert('erro ao cadastrar')
    })
  }

  if(establishmentData && establishmentData.length == 0){
    return <h1>Estabelecimento Inexistente</h1>;
  }
  return (
    <div id={styles.pagePostList} className="container">
      <PageHeader
        title="Atualização de dados do Estabelecimento"
        description="Altere apenas os campos que deseja atualizar"
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
          <br/>
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
          <br/>
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
          <legend>Localização</legend>{
            currentLatitude && currentLongitude &&
            <Map style={{ width: '100%', height: 280, borderRadius: 10 }} center={[currentLatitude, currentLongitude]} zoom={16} onclick={handleMapClick}>
            {
              position.latitude != 0 && <Marker interactive={false} icon={mapIcon} position={[ position.latitude, position.longitude]} />
            }
          </Map>
          }
          <br/>
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
              Atualizar estabelecimento
          </button>
        </footer>
        </form>
      </main>
    </div>
  );
}