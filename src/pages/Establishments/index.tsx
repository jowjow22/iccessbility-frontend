import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import styles from './style.module.css';

import Map from '../../components/Map';

import { Marker, Popup } from 'react-leaflet';

import {FiPlus, FiArrowRight} from 'react-icons/fi';

import iccessLogo from '../../assets/images/NewLogo.png';

import backIcon from '../../assets/images/icons/back.svg';

import './popUp.css';

import 'leaflet/dist/leaflet.css';

import mapIcon from '../../components/Map/iccessMapIcon';
import { useAuth } from '../../Context/AuthContext';

function EstablishmentMap(){
  const { goBack } = useHistory();
  const { user, isJuridic } = useAuth();
  
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
      <Map style={{ width: '100%', height: '100%', zIndex: 5 }}>

        <Marker
          icon={mapIcon}
          position={[-24.2778112, -46.9630976]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            SubWay de Peruíbe
              <Link to="/establishment/1">
                <FiArrowRight size={20} color="#FFF" />
              </Link>
          </Popup>
        </Marker>
      </Map>
      {
        isJuridic ? (
          <Link to="/create" className={styles.createEstablishment}>
          <FiPlus size={32} color="#FFF" />
        </Link>
        ) : null
      }
    </div>
  );
}

export default EstablishmentMap;