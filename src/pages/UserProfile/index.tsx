import React from 'react';
import PageHeader from '../../components/PageHeader';
import styles from './style.module.css';

export default function UserProfile (){
  return (
    <div id={styles.pageUserProfile} className="container">
        <PageHeader title="sla" >
            <img src="https://avatars1.githubusercontent.com/u/51102351?s=460&v=4" alt="jow" style={{float: "right"}} />
        </PageHeader>
    </div>
  );
}