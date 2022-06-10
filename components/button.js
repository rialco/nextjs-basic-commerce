import { useState } from 'react';

import styles from '../styles/components/button.module.scss';

const Button = ({ action, text, type }) => {
  const [ disabled, setDisabled ] = useState(false);

  const updateBtnState = () => {
    setDisabled((prevState) => !prevState);
  };

  return (
    <button
      className={`${styles['btn']} ${type && type === 'cancel' ? styles['cancel'] : ''}`}
      onClick={() => {
        if (action) action(updateBtnState);
      }} 
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;