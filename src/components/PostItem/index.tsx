import React from 'react';
import styles from './style.module.css';
import interestIcon from '../../assets/images/icons/interest.svg';
import { FaHeart } from 'react-icons/fa';

interface PostItemProps {
  user: {
    name: string;
    profilePic: string;
    type: string;
    city: string;
  };
  post: {
    id: number;
    title: string;
    desc: string;
    postImage: string;
    price: number;
    likes: number;
    discount?: number; 
  };
}

const PostItem: React.FC<PostItemProps> = (props) => {
  return (
    <article className={styles.postItem}>
      <header>
        <img src={props.user.profilePic} alt={props.user.name} />
        <div>
          <strong>{props.user.name} - {props.user.city}</strong>
          <span>{props.user.type}</span>
        </div>
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
        <button type="button">
          <img src={interestIcon} alt="Interessado" />
          Tenho Interesse!
        </button>
        <button type="button">
          <FaHeart size={24} color="#FFF" />
          <h3>{props.post.likes}</h3>
        </button>
      </footer>
    </article>
  );
}

export default PostItem;
