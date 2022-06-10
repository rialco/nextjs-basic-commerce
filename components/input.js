import { useEffect } from 'react';
import styles from '../styles/components/input.module.scss';

const Input = ({ name, type, placeholder, updateFunction, value, readonly }) => {
  useEffect(() => {
    if (value) document.getElementById(name).value = value;
  }, []);

  return (
    <>
      <label className={styles.label}>{placeholder}</label>
      <input id={name} className={styles.input} type={type} onChange={(e) => {
        updateFunction(e, name);
      }} readOnly={readonly ? readonly : false}/>
    </>
    
  );
};

export default Input;