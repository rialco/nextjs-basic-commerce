import { GiBroccoli, GiNotebook } from 'react-icons/gi';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '../../components/button';
import Input from '../../components/input';
import Navbar from '../../components/navbar';
import ModalForm from '../../components/modalForm';

import styles from '../../styles/pages/inventory.module.scss';

const InventoryPage = ({ firebaseApp }) => {
  const router = useRouter();
  const [ addModalVisible, setAddModalVisible ] = useState(false);
  

  const updateAddModalState = () => {
    setAddModalVisible((prevState) => !prevState);
  };
  
  const goToLink = (href) => {
    router.push(href);
  };

  return (
    <>
      {addModalVisible ? 
        <ModalForm title='Agregar producto'>
          <AddProductForm updateModalState={updateAddModalState}/>
        </ModalForm> 
        : 
        <></>
      }
      
      <Navbar/>
      <div className={styles.dashboard}>
        <div className={styles.leftPanel}>
          <ul>
            <li><GiBroccoli />Inventario</li>
            <li onClick={() => {
              goToLink('/orders');
            }}><GiNotebook />Pedidos</li>
          </ul>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.inventoryPanel}>
            <h2>Productos</h2>
            <div>
              <Button text='Agregar producto' action={updateAddModalState}/>
            </div>
            <div className={styles.table}>
              <div className={styles.tableHeaders}>
                <ul>
                  <li>Nombre</li>
                  <li>Categoria</li>
                  <li>Precio</li>
                  <li>Cantidad</li>
                  <li>Acciones</li>
                </ul>
              </div>
              <div className={styles.tableContent}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AddProductForm = ({ updateModalState }) => {
  return (
    <div>
      <Input type='text' placeholder='Nombre' />
      <Input type='text' placeholder='Categoria' />
      <Input type='text' placeholder='Precio' />
      <Input type='text' placeholder='Inventario' />
      <Button text='Agregar' />
      <Button text='Cancelar' type='cancel' action={updateModalState}/>
    </div>
  );
};

export default InventoryPage;