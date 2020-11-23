import React, { useEffect } from "react";
import { FaWhatsapp, FaTrashAlt, FaEdit, FaStar } from "react-icons/fa";
import { Marker } from "react-leaflet";
import { Link, useParams } from 'react-router-dom';

import PrimaryButton from "../../components/PrimaryButton";
import Map from '../../components/Map';
import mapIcon from '../../components/Map/iccessMapIcon';

import styles from './style.module.css';
import { useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../Context/AuthContext";
import RatingStars from "../../components/RatingStars";

interface EstablishmentParams {
  id: string;
}

interface EstablishmentDataParams {
  cd_estabelecimento: number;
  nm_estabelecimento: string;
  nm_cidade_estabelecimento: string;
  img_estabelecimento: string;
  sg_estado: string;
  latitude: number;
  longitude: number;
  qt_media_stars: number;
  acessibilidade: string;
  id_usuario: number;
  id_tp_estabelecimento:number;
}

interface EOwner {
  cd_usuario: number;
  nm_usuario: string;
  dt_nascimento: string;
  img_foto: string;
  nm_endereco: string;
  nm_cidade: string;
  sg_estado: string;
  tp_pessoa: string;
  nm_cpf_cnpj: string;
  ds_bio: string;
  img_capa: string;
  nm_senha: string;
  nr_telefone: string;
}
interface EstablishmentType {
  cd_tp_estabelecimento: number;
  nm_tipo: string;
}

export default function Orphanage() {
  const params = useParams<EstablishmentParams>();
  const [establishment, setEstablishment] = useState<EstablishmentDataParams>();
  const [eType, setEType] = useState<EstablishmentType>();
  const [eOwner, setEOwner] = useState<EOwner>();
  const { user } = useAuth();
  
  useEffect(()=>{
    (async ()=>{
      const establishmentData = await api.get(`establishment/showOne/${params.id}`);
      setEstablishment(establishmentData.data[0]);
      const establishmentType = await api.get(`eType/${establishmentData.data[0].id_tp_estabelecimento}`);
      setEType(establishmentType.data);
      const establishmentOwner = await api.get(`user/${establishmentData.data[0].id_usuario}`);
      setEOwner(establishmentOwner.data);
    })()
  }, [params.id])

  if(!establishment){
    return <h1>Loading...</h1>;
  }

  return (
    <div id={styles.pageEstablishment}>
      <Sidebar />
      <main>
        <div className={styles.establishmentDetails}>
          <img src={establishment.img_estabelecimento} alt={establishment.nm_estabelecimento} />
          {
            establishment.id_usuario == user?.id ? 
            <div className={styles.actionButtons}>
            <Link to='/'>
              <FaEdit color="#fff" size={35}></FaEdit>
            </Link>
            <Link to={`/delSomething/establishment/${user.id}/${establishment.cd_estabelecimento}`}>
              <FaTrashAlt color="#fff" className={styles.delete} size={35}></FaTrashAlt>
            </Link>
          </div> : null
          }
          <div className={styles.establishmentDetailsContent}>
          <h1>{establishment.nm_estabelecimento}</h1>
          <p>{eType?.nm_tipo}</p>
          <h2><FaStar></FaStar> {establishment.qt_media_stars}</h2>
            <div className={styles.mapContainer}>
              <Map
                center={[establishment.latitude, establishment.longitude]}
                interactive={false}
                style={{ width: '100%', height: 280 }}
              >
                <Marker interactive={false} icon={mapIcon} position={[establishment.latitude, establishment.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${establishment.latitude},${establishment.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Esse estabelecimento fornece acessbilidade à: </h2>
            <p>{establishment.acessibilidade}</p>
            <br/>
            <h4>Seu Julgamento sobre esse estabelecimento</h4>
            <br/>
            <RatingStars userID={user?.id} eID={establishment.cd_estabelecimento}></RatingStars>
            <PrimaryButton type="button" onClick={()=>{
             window.location.href = `https://wa.me/55${eOwner?.nr_telefone}`;
            }}>
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </PrimaryButton>
          </div>
        </div>
      </main>
    </div>
  );
}