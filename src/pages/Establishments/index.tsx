import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import styles from './style.module.css';

import Map from '../../components/Map';

import { Marker, Popup } from 'react-leaflet';

import {FiPlus, FiArrowRight} from 'react-icons/fi';

import { FaAccessibleIcon } from 'react-icons/fa';

import iccessLogo from '../../assets/images/NewLogo.png';

import backIcon from '../../assets/images/icons/back.svg';

import './popUp.css';

import 'leaflet/dist/leaflet.css';

import mapIcon from '../../components/Map/iccessMapIcon';
import { useAuth } from '../../Context/AuthContext';
import api from '../../services/api';

function EstablishmentMap(){
  const { goBack } = useHistory();
  const { user, isJuridic } = useAuth();

  const [establishments, setEstablishments] = useState<Array<any>>();
  const [currentLatitude, setCurrentLatitude] = useState<any>();
  const [currentLongitude, setCurrentLongitude] = useState<any>();

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (pos)=>{
         let latitude = pos.coords.latitude; let longitude = pos.coords.longitude;
         setCurrentLatitude(latitude);
         setCurrentLongitude(longitude);
        });
  }, []);

  useEffect(()=>{
    (async ()=>{
      const establishmentsList = await api.get(`establishment/${user?.city}`);

      setEstablishments(establishmentsList.data);
    })()
  }, []);
  
  return (
    <div id={styles.pageMap}>
      <aside>
        <header>
        <button onClick={goBack}>
          <img src={backIcon} alt="Voltar" />
        </button>
          <img src={iccessLogo} alt="Iccessbility"/>

          <h2>Procure Estabelecimentos</h2>
          <p>Esse mapa lista estabelecimentos que possuam atendimento acessivo</p>
        </header>
        <footer>
          <strong>Iccessbility</strong>
          <span>2020</span>
        </footer>
      </aside>
      {
        currentLatitude && currentLongitude &&
        <Map center={[currentLatitude, currentLongitude]} zoom={13}  style={{ width: '100%', height: '100%', zIndex: 5 }}>

        {
          establishments?.map((establishment)=>{
            return (
              <Marker
              icon={mapIcon}
              position={[establishment.latitude, establishment.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {establishment.nm_estabelecimento}
                  <Link to={`/establishment/showOne/${establishment.cd_estabelecimento}`}>
                    <FiArrowRight size={20} color="#FFF" />
                  </Link>
              </Popup>
            </Marker>
            );
          })
        }
        
        </Map>
      }
      {
        isJuridic ? (
        <Link to="establishment/create" className={styles.createEstablishment}>
          <FiPlus size={32} color="#FFF" />
        </Link>
        ) : null
      }
              
    </div>
  );
}

export default EstablishmentMap;