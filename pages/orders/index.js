import { GiBroccoli, GiNotebook } from 'react-icons/gi';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '../../components/button';
import Input from '../../components/input';
import Navbar from '../../components/navbar';
import ModalForm from '../../components/modalForm';

import styles from '../../styles/pages/inventory.module.scss';

const OrdersPage = ({ firebaseApp }) => {
  const router = useRouter();
  const [ addModalVisible, setAddModalVisible ] = useState(false);
  
  const updateAddOrderModal = () => {
    setAddModalVisible((prevState) => !prevState);
  };

  const goToLink = (href) => {
    router.push(href);
  };
    
  return (
    <>
      {addModalVisible ? 
        <ModalForm title='Agregar pedido'>
          <AddOrderForm updateModalState={updateAddOrderModal}/>
        </ModalForm> 
        : 
        <></>
      }

      <Navbar/>
      <div className={styles.dashboard}>
        <div className={styles.leftPanel}>
          <ul>
            <li onClick={() => {
              goToLink('/inventory');
            }}><GiBroccoli />Inventario</li>
            <li><GiNotebook />Pedidos</li>
          </ul>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.inventoryPanel}>
            <h2>Pedidos</h2>
            <div>
              <Button text='Agregar pedido' action={updateAddOrderModal}/>
            </div>
            <div className={styles.table}>
              <div className={styles.tableHeaders}>
                <ul>
                  <li>Cliente</li>
                  <li>Producto</li>
                  <li>Cantidad</li>
                  <li>Total</li>
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

const AddOrderForm = ({ updateModalState }) => {
  return (
    <div>
      <Input type='text' placeholder='Cliente' />
      <Input type='text' placeholder='Producto' />
      <Input type='text' placeholder='Cantidad' />
      <Button text='Agregar' />
      <Button text='Cancelar' type='cancel' action={updateModalState}/>
    </div>
  );
};

export default OrdersPage;