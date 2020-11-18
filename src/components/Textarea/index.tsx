import React, { TextareaHTMLAttributes } from 'react';
import styles from './style.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest}) => {

  return (
    <div className={styles.textareaBlock}>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest} />
    </div>
  );
}

export default Textarea;