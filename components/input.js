import styles from '../styles/components/input.module.scss';

const Input = ({ name, type, placeholder, updateFunction }) => {
  return (
    <>
      <label className={styles.label}>{placeholder}</label>
      <input className={styles.input} type={type} onChange={(e) => {
        updateFunction(e, name);
      }}/>
    </>
    
  );
};

export default Input;