import React, { InputHTMLAttributes } from 'react';
import styles from './style.module.css';

interface ImageProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Image: React.FC<ImageProps> = ({ label, name, ...rest}) => {

  return (
    <div className={styles.imageBlock}>
      <label htmlFor={name}>{label}</label>
      <input type="file" id={name} {...rest} />
    </div>
  );
}

export default Image;