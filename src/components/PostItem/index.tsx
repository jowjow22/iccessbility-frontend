import React, { useEffect } from 'react';
import styles from './style.module.css';
import interestIcon from '../../assets/images/icons/interest.svg';
import { FaHeart, FaTrashAlt, FaEdit }  from 'react-icons/fa';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';

interface PostItemProps {
  userID: number;
  owner: {
    id: number;
    name: string;
    profilePic: string;
    type: string;
    city: string;
    phone: string;
  };
  post: {
    id: number;
    title: string;
    desc: string;
    postImage: string;
    price: number;
    postType?: string;
    likes: number;
    discount?: number; 
  };
}

const PostItem: React.FC<PostItemProps> = (props) => {
  const history = useHistory();

  useEffect(()=>{
    (async ()=>{
      await api.get('likes/1')
    })()
  })
  return (
    <article className={styles.postItem}>
      <header>
        <img src={props.owner.profilePic} alt={props.owner.name} />
        <div className={styles.headerContainer}>
          <strong onClick={()=>{
            history.push(`/profile/${props.owner.id}`)
          }}>{props.owner.name} - {props.owner.city}</strong>
          <span>{props.owner.type}</span>
        </div>
          {
            props.owner.id == props.userID ? 
            <FaTrashAlt color="#f52929" onClick={()=>{
              history.push(`../delSomething/post/${props.userID}/${props.post.id}`);
            }} size={20}></FaTrashAlt> : null
          }
      </header>
      <strong>{props.post.title}</strong>
      <p>{props.post.desc}</p>
      <div className={styles.postImage}>
        <img src={props.post.postImage} alt={props.post.title} />
      </div>
      <footer>
        <p>
          Preço
          <strong>
            R$ {props.post.price} {props.post.discount && `(Desconto de ${props.post.discount}%)`}
          </strong>
        </p>
        <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/55${props.owner!.phone}`}>
          <img src={interestIcon} alt="Interessado" />
          Tenho Interesse!
        </a>
        <button type="button" onClick={async ()=>{
          await api.post(`likes/${props.post.id}/${props.userID}`);
          window.location.reload();
        }}>
          <FaHeart size={24} color="#FFF" />
          <h3>{props.post.likes}</h3>
        </button>
      </footer>
    </article>
  );
}

export default PostItem;
