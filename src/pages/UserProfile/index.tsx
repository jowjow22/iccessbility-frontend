import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../../components/PostItem';
import { useAuth } from '../../Context/AuthContext';
import api from '../../services/api';

import { FaArrowLeft, FaEdit, FaTrashAlt } from 'react-icons/fa';
import styles from './style.module.css';

interface ProfilePageParams{
  userID: string;
}

export default function UserProfile (){
  const params = useParams<ProfilePageParams>();
  const { user } = useAuth();
  const [posts, setPosts] = useState<Array<any>>();
  const [profile, setProfile] = useState<any>();
  const [verifyFollowing, setVerifyFollowing] = useState<any>();

  useEffect(()=>{
    (async ()=>{
      const userData = await api.get(`user/${params.userID}`);

      setProfile(userData.data);
    })()
  },[params.userID]);
  useEffect(()=>{
    (async ()=>{
      const verifyFollow = (await api.get(`verifyFollow/${user?.id}/${params.userID}`)).data.following;
      setVerifyFollowing(verifyFollow);
    })()
  },[])

  useEffect(()=>{
    (async ()=>{
      const postsData = await api.get(`post/${params.userID}`);

      setPosts(postsData.data);
    })()
  },[params.userID]);

if(!profile){
  return <h1>Loading...</h1>
}
  return (
    <div id={styles.pageUserProfile} className="container">
      <header>
        <div className={styles.headerContent}>
          <div className={styles.actionIcons}>
            <Link to="/home" >
              <FaArrowLeft color="#808080" size={25} />
            </Link>
            {
              Number(params.userID) === user?.id ? (
              <>
              <Link to='/user/update'>
                <FaEdit color="#fff" size={35} />
              </Link>  
              <Link to={`/delUser`} className={styles.deleteProfile} > 
                <FaTrashAlt color="#fff" size={25} /> 
              </Link> 
              </>
              ) : null
            }
          </div>
        <div className={styles.coverPic}>
        <img 
        src={profile.img_capa}
        alt="cover"/>
        </div>
        <div className={styles.userPic}>
          <img src={profile.img_foto} alt="user"/>
        </div>
        <div className={styles.userInfos}>
          <div className={styles.infos}>
          <h1>{profile.nm_usuario}</h1>
          <p>Pessoa {profile.tp_pessoa} - {profile.nm_cidade} <br /> {profile.ds_bio} </p>
          </div>
          { 
            Number(params.userID) === user?.id ? null : verifyFollowing === false ?
            <button type="button" id="follow-button" onClick={async ()=>{
              await api.post(`follow/${user?.id}/${params.userID}`);
              window.location.reload();
            }}>Seguir</button> :
            <button type="button" id={styles.unfollowButton} onClick={async ()=>{
              await api.delete(`unfollow/${user?.id}/${params.userID}`);
              window.location.reload();
            }}>Deixar de seguir</button>
          }
        </div>
        </div>
      </header>
      <main>
      {
        posts?.map((post)=>{
          if(post.Owner.type === "Física"){
            return <PostItem
            key={post.postData.id} 
            owner={post.Owner} 
            post={{
              title: post.postData.title,
              desc: post.postData.desc,
              id: post.postData.id,
              likes: post.postData.likesNum,
              postImage: post.postData.postImage,
              price: post.postData.price
            }}
            userID={user!.id}
            />
          }
          else{
            return <PostItem
            key={post.postData.id} 
            owner={post.Owner} 
            post={{
              title: post.postData.title,
              desc: post.postData.desc,
              id: post.postData.id,
              likes: post.postData.likesNum,
              postImage: post.postData.postImage,
              price: post.postData.price,
              discount: post.postData.discount
            }}
            userID={user!.id}
            />
          }
        })
      }
      </main>
    </div>
  );
}