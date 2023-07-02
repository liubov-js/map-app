import React from 'react';
import './Button.css';

interface ButtonProps {
  disabled?: boolean,
  text: string,
  handler: () => void,
}

const Button: React.FC<ButtonProps> = ({text, handler, disabled = false}) => {
  return (
    <div className='BtnContainer' onClick={handler}>
      <button className='Btn' disabled={disabled}>{text}</button>
    </div>
  );
}

export default Button;
