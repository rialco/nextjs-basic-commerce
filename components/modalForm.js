import styles from '../styles/components/modalForm.module.scss';

const ModalForm = ({ title, children }) => {
  return (
    <div className={styles.modalBg}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalForm;