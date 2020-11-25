import React, { useEffect, useState } from 'react';

import { FaStar } from 'react-icons/fa';
import api from '../../services/api';

import  styles from './style.module.css';

interface RatingStarProps{
  userID: number | undefined;
  eID: number;
}

const RatingStars: React.FC<RatingStarProps> = (props) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<any>();

  useEffect(()=>{
   (async()=>{
    const  verifyRating = (await api.get(`rating/your/${props.eID}/${props.userID}`)).data;
    if(verifyRating.length > 0){
      setRating(verifyRating[0].qt_stars);
    }
   })()
  }, []);

  return (
    <div id={styles.starsContainer}>
      {[...Array(5)].map((star: any, i: any)=>{
        const ratingValue = i + 1;
        return (
          <label>
            <input 
            type="radio" 
            name="rating" 
            style={{display:'none'}} 
            value={ratingValue} 
            onClick={(e)=>{
              api.post(`rating/${props.userID}/${props.eID}/${ratingValue}`).then(()=>{
                setRating(ratingValue);
              }).catch(()=>{
                alert('você já julgou esse estabelecimento');
              })
            }}
            />

            {
              <FaStar 
              size={'5.96vw'} 
              className={styles.star} 
              color={ ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" } 
              onMouseEnter={()=>{
                setHover(ratingValue)
              }}
              onMouseLeave={()=>{
                setHover(null)
              }}
              >
              </FaStar>
            }
          </label>
        );
      })}
    
  </div>
  );
}

export default RatingStars;