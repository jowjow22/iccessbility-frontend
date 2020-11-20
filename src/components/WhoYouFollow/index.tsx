import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import api from '../../services/api';
import styles from  './style.module.css';

interface WhoYouFollowProps {
  name: string;
  personType: string;
  profilePic: string;
  userId: number;
}

const WhoYouFollow: React.FC<WhoYouFollowProps> = (props) => {
  const { user } = useAuth();
  return (
    <article className={styles.followItem}>
      <header>
        <img src={props.profilePic} alt={props.name} />
        <div>
          <strong>{props.name}</strong>
          <span>{props.personType}</span>
        </div>
      </header>
      <footer>
        <button type="button" onClick={async ()=>{
          await api.delete(`unfollow/${user?.id}/${props.userId}`);
          window.location.reload();
        }}>
          Deixar de seguir
        </button>
      </footer>
    </article>
  );
}
export default WhoYouFollow;
