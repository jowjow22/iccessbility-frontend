import React, { ButtonHTMLAttributes } from 'react';

import styles from './style.module.css';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <button className={styles.primaryButton} {...props}>
      {children}
    </button>
  );
}