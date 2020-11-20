import React, { useEffect, useState } from 'react';

import styles from './style.module.css';

import NavBar from '../../components/NavBar';
import PostItem from '../../components/PostItem';
import offIcon from '../../assets/images/icons/off.svg';
import makePost from '../../assets/images/icons/makePost.svg';
import establishment from '../../assets/images/icons/establishment.svg';
import WhoToFollow from '../../components/WhoToFollow';
import WhoYouFollow from '../../components/WhoYouFollow';
import { Link } from 'react-router-dom';
import {useAuth} from '../../Context/AuthContext';
import api from '../../services/api';

export default function Home() {
  const { signOut, user  } = useAuth();
  const [notFollowingUsers, setNotFollowing] = useState<Array<any>>();
  const [followingUsers, setFollowing] = useState<Array<any>>();
  const [posts, setPosts] = useState<Array<any>>();

  useEffect(()=>{
    (async () =>{
      const res = await api.get(`notFollowing/${user?.id}`);
      const noFollow: Array<any> = res.data.notFollowing;
      setNotFollowing(noFollow);
    })()
  }, [])

  useEffect(()=>{
    (async () =>{
      const res = await api.get(`following/${user?.id}`);
      const follow: Array<any> = res.data.following;
      setFollowing(follow);
    })()
  }, [])

  useEffect(()=>{
    (async () =>{
        const res =  await api.get(`post/${user?.id}`)
        const posts: Array<any> = res.data;
        await setPosts(posts);
    })()
  }, []);

  function handleSignOut(){
    signOut();
  }
  return (
    <div id={styles.pagePostList} className="container">
      <NavBar>
        <Link to="/composePost">
          <img src={makePost} alt="Criar um Post"/>
        </Link>
        <Link to="/establishments">
          <img src={establishment} alt="Procurar estabelecimentos"/>
        </Link>
        <Link to="/" onClick={()=>{handleSignOut()}} >
          <img src={offIcon} alt="Sair" />
        </Link>
          <img src={user?.profilePic} alt="Sair" />
      </NavBar>
      <div className={styles.mainBody}>
      <main>
      {
        posts?.map((post)=>{
          if(post.Owner.type === "Física"){
            return <PostItem
            key={post.postData.id} 
            user={post.Owner} 
            post={{
              title: post.postData.title,
              desc: post.postData.desc,
              id: post.postData.id,
              likes: post.postData.likesNum,
              postImage: post.postData.postImage,
              price: post.postData.price
            }} 
            />
          }
          else{
            return <PostItem
            key={post.postData.id} 
            user={post.Owner} 
            post={{
              title: post.postData.title,
              desc: post.postData.desc,
              id: post.postData.id,
              likes: post.postData.likesNum,
              postImage: post.postData.postImage,
              price: post.postData.price,
              discount: post.postData.discount
            }} 
            />
          }
        })
      }
      </main>

      <div className={styles.sideBar}>
      {
        notFollowingUsers?.map((notFollowingUser)=>{
          return <WhoToFollow
                  key={notFollowingUser.cd_usuario}
                  name={notFollowingUser.nm_usuario} 
                  personType={notFollowingUser.tp_pessoa} 
                  profilePic={notFollowingUser.img_foto} 
                  userId={notFollowingUser.cd_usuario}
                  />
        })
      }

      </div>

      <div className={styles.sideBarRight}>
      {
        followingUsers?.map((following)=>{
          return <WhoYouFollow
                  key={following.cd_usuario} 
                  name={following.nm_usuario} 
                  personType={following.tp_pessoa} 
                  profilePic={following.img_foto} 
                  userId={following.cd_usuario}
                  />
        })
      }

      </div>
      </div>
    </div>
  );
}