import React, { FormEvent, useState, useEffect } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';

import styles from './style.module.css';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import TypeImage from '../../components/TypeImage';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { type } from 'os';

export default function ComposePost() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [postPic, setPostPic] = useState();
  const [postType, setPostType] = useState('');
  const [discount, setDiscount] = useState('');
  const [val, setVal] = useState('');
  const [typeProdServ, setTypeProdServ] = useState<number>();
  const history = useHistory();
  const [typePS, setTypePS] = useState<any>();
  const { user, isJuridic } = useAuth();


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

  useEffect(()=>{
    (async ()=>{
      const res = await api.get('typePS');
      const typesPS = res.data;
      const statePrevent: Array<object> = [{}]; 

      typesPS.map((typePS2: any)=>{
        statePrevent.push({value: typePS2.cd_tp_prod_serv, label: `${typePS2.nm_tp_prod_serv}, ${typePS2.ds_tp_prod_serv}`});
        return statePrevent;
      });
      setTypePS(statePrevent);
    })()
  }, [])

  function handleCreateUser(e: FormEvent){
    e.preventDefault();
    if(discount != ''){
      api.post('post', {
        name,
        description: desc,
        image: postPic,
        type: postType,
        discount,
        val,
        status: '',
        idType: typeProdServ,
        idUser: user?.id
      }).then(()=>{
        alert('cadastro realizado com sucesso');
        history.push('/home');
  
      }).catch(()=>{
        alert('erro no cadastro')
      })
    }else{
      api.post('post', {
        name,
        description: desc,
        image: postPic,
        type: postType,
        val,
        status: '',
        idType: typeProdServ,
        idUser: user?.id
      }).then(()=>{
        alert('cadastro realizado com sucesso');
        history.push('/home');
  
      }).catch(()=>{
        alert('erro no cadastro')
      })
    }
  }


  return (
    <div id={styles.pagePostList} className="container">
      <PageHeader
        title="Preencha os dados do seu post"
        description="Lembrando que o post pode ser um produto ou serviço voltado a PCD ou a área de saúde."
      />
      <main>
        <form onSubmit={handleCreateUser} >
        <fieldset>
          <legend>Dados do post</legend>
          <Input 
          name="name" 
          label="Nome do Post" 
          value={name} 
          onChange={(e)=>{ setName(e.target.value) }} required />

          <Textarea 
          name="desc" 
          label="Descrição"
          value={desc}
          onChange={(e)=>{ setDesc(e.target.value) }}
          required
          />

          <TypeImage 
          type="file" 
          name="post-image" 
          label="Escolha uma imagem para seu Post"
          value=""
          onChange={async (e)=>{ 
            const file = e.target.files![0];
            const base64: any = await convertBase64(file);
            setPostPic(base64);
          }}
          required
          />

          <Select 
          name="postType" 
          label="Tipo de Post"
          options={[
            { value:'Produto', label: 'Produto' },
            { value:'Serviço', label: 'Serviço' }
          ]}
          value={postType}
          onChange={(e)=>{ setPostType(e.target.value) }}
          required
          />
          {
            isJuridic ? <Input
            type="number"
            name="discount"
            label="Desconto exclusivo para a plataforma em porcentagem(Minimo de 3%)"
            value={discount}
            step="0.050"
            onChange={(e)=>{ setDiscount(e.target.value) }} 
            required
            min="3"
            /> : null
          }
          <Input 
          name="val"
          type="number"
          label="Valor do Produto, caso seja uma doação, deixe em branco"
          value={val}
          onChange={(e)=>{ setVal(e.target.value) }}
          step="0.050"
          />
          {
            typePS &&
            <Select 
            name="postType" 
            label="Tipo de produto ou Serviço"
            options={typePS!}
            value={typeProdServ}
            onChange={(e)=>{ setTypeProdServ(eval(e.target.value)) }}
            required
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
              Criar Post
          </button>
        </footer>
        </form>
      </main>
    </div>
  );
}