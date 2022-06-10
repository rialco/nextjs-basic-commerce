import { GiBroccoli, GiNotebook } from 'react-icons/gi';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onChildAdded, get } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../components/button';
import Input from '../../components/input';
import Navbar from '../../components/navbar';
import ModalForm from '../../components/modalForm';

import styles from '../../styles/pages/inventory.module.scss';

const OrdersPage = ({ firebaseApp }) => {
  const router = useRouter();
  const db = getDatabase(firebaseApp);
  const [ addModalVisible, setAddModalVisible ] = useState(false);
  const [ orders, setOrders ] = useState([]);
  
  const updateAddOrderModal = () => {
    setAddModalVisible((prevState) => !prevState);
  };

  const goToLink = (href) => {
    router.push(href);
  };

  const addOrderToList = (order) => {
    setOrders((prevState) => {
      return [ ...prevState, order ];
    });
  };

  useEffect(() => {
    const ordersRef = ref(db, 'orders/');
    const orderSub = onChildAdded(ordersRef, (data) => {
      addOrderToList(data.val());
    });

    return () => {
      orderSub();
    };
  }, []);
    
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
              <div className={styles.tableContent}>
                {orders.map((o, idx) => {
                  return (
                    <ul key={idx}>
                      <li>{o.name}</li>
                      <li>{o.product}</li>
                      <li>{o.quantity}</li>
                      <li>{o.total}</li>
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AddOrderForm = ({ updateModalState, firebaseApp }) => {
  const [ name, setName ] = useState('');
  const [ product, setProduct ] = useState('');
  const [ quantity, setQuantity ] = useState(0);
  const [ total, setTotal ] = useState(1);

  const db = getDatabase(firebaseApp);

  const inputUpdate = (e, name) => {
    const updateFuncObj = {
      'name'     : setName,
      'product'  : setProduct,
      'quantity' : setQuantity
    };
    
    updateFuncObj[name](e.target.value);
  };

  const addOrder = () => {
    get(ref(db, `products/${product.toLowerCase()}`)).then((snapshot) => {
      if (snapshot.exists()) {
        set(ref(db, 'orders/' + uuidv4()), {
          name,
          product,
          quantity,
          total : parseInt(snapshot.val().price) * parseInt(quantity)
        });
      } else {
        alert('No existe un producto con ese nombre.');
      }
    });
    
    updateModalState();
  };

  return (
    <div>
      <Input name='name' type='text' placeholder='Cliente' updateFunction={inputUpdate}/>
      <Input name='product' type='text' placeholder='Producto' updateFunction={inputUpdate}/>
      <Input name='quantity' type='text' placeholder='Cantidad' updateFunction={inputUpdate}/>
      <Button text='Agregar' action={addOrder}/>
      <Button text='Cancelar' type='cancel' action={updateModalState}/>
    </div>
  );
};

export default OrdersPage;