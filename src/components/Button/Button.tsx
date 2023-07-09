import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  disabled?: boolean,
  text: string,
  handler: () => void,
}

const Button: React.FC<ButtonProps> = ({text, handler, disabled = false}) => {
  return (
    <div className={styles.container} onClick={handler}>
      <button className={styles.button} disabled={disabled}>{text}</button>
    </div>
  );
}

export default Button;
