import React, { useEffect, useState } from 'react';



import styles from './style.module.css';

import NavBar from '../../components/NavBar';
import PostItem from '../../components/PostItem';
import offIcon from '../../assets/images/icons/off.svg';
import makePost from '../../assets/images/icons/makePost.svg';
import establishment from '../../assets/images/icons/establishment.svg';
import WhoToFollow from '../../components/WhoToFollow';
import WhoYouFollow from '../../components/WhoYouFollow';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from '../../Context/AuthContext';
import api from '../../services/api';
import {FaSignOutAlt, FaStoreAlt, FaPlusCircle, FaUserPlus, FaTimes} from 'react-icons/fa'

export default function Home() {
  const { signOut, user  } = useAuth();
  const [notFollowingUsers, setNotFollowing] = useState<Array<any>>();
  const [followingUsers, setFollowing] = useState<Array<any>>();
  const [posts, setPosts] = useState<Array<any>>();
  const history = useHistory();

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
        const res =  await api.get(`post/${user?.id}/${user?.city}`);
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
          <FaPlusCircle color="#fff" size={35} />
        </Link>
        <Link to="/establishments">
          <FaStoreAlt color="#fff" size={35} />
        </Link>
        <Link to="/" onClick={()=>{handleSignOut()}} >
          <FaSignOutAlt color="#fff" size={35} />
        </Link>
        <Link to="/home" onClick={()=>{
          document.getElementById('closeUsersWindow')!.style.display = 'none';
          document.getElementById('showUsers')!.style.display = 'unset';
          document.getElementById('mainPosts')!.style.display = 'unset';
          document.getElementById('whoYouFollow')!.style.display = 'none';
          document.getElementById('whoToFollow')!.style.display = 'none';
        }} >
          <FaTimes color="#fff" style={{display: 'none'}} id="closeUsersWindow" size={35} />
          </Link>
        <Link to="#users" className={styles.showUsers} id="showUsers" onClick={()=>{
          document.getElementById('mainPosts')!.style.display = 'none';
          document.getElementById('showUsers')!.style.display = 'none';
          document.getElementById('closeUsersWindow')!.style.display = 'unset';
          document.getElementById('whoYouFollow')!.style.display = 'flex';
          document.getElementById('whoToFollow')!.style.display = 'flex';
        }} >
          <FaUserPlus color="#fff" size={35} onClick={()=>{
            
          }} />
        </Link>
          <img src={user?.profilePic} alt="Profile" className={styles.profilePic} onClick={()=>{
            history.push(`/profile/${user?.id}`);
          }} />
      </NavBar>
      <div className={styles.mainBody}>
      <main id="mainPosts">
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
            console.log(post.postData);
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

      <div className={styles.sideBar} id="whoToFollow">
      {
        notFollowingUsers?.map((notFollowingUser)=>{
          return <WhoToFollow
                  key={notFollowingUser.cd_usuario}
                  id={notFollowingUser.cd_usuario}
                  name={notFollowingUser.nm_usuario} 
                  personType={notFollowingUser.tp_pessoa} 
                  profilePic={notFollowingUser.img_foto} 
                  userId={notFollowingUser.cd_usuario}
                  />
        })
      }

      </div>

      <div className={styles.sideBarRight} id="whoYouFollow" >
      {
        followingUsers?.map((following)=>{
          return <WhoYouFollow
                  key={following.cd_usuario}
                  id={following.cd_usuario}
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