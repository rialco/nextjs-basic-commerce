import { GiBroccoli, GiNotebook } from 'react-icons/gi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDatabase, ref, set, onChildAdded, remove } from 'firebase/database';


import Button from '../../components/button';
import Input from '../../components/input';
import Navbar from '../../components/navbar';
import ModalForm from '../../components/modalForm';

import styles from '../../styles/pages/inventory.module.scss';

const InventoryPage = ({ firebaseApp }) => {
  const router = useRouter();
  const db = getDatabase(firebaseApp);
  const [ addModalVisible, setAddModalVisible ] = useState(false);
  const [ editModalVisible, setEditModalVisible ] = useState(false);
  const [ selectedProduct, setSelectedProduct ] = useState('');
  const [ products, setProducts ] = useState([]);
  

  const updateAddModalState = () => {
    setAddModalVisible((prevState) => !prevState);
  };

  const updateEditModalState = () => {
    setEditModalVisible((prevState) => !prevState);
  };
  
  const goToLink = (href) => {
    router.push(href);
  };

  const addProductToList = (product) => {
    setProducts((prevState) => {
      return [ ...prevState, product ];
    });
  };

  useEffect(() => {
    const productsRef = ref(db, 'products/');
    const productSub = onChildAdded(productsRef, (data) => {
      addProductToList(data.val());
    });

    return () => productSub;
  }, []);

  return (
    <>
      {addModalVisible ? 
        <ModalForm title='Agregar producto'>
          <AddProductForm updateModalState={updateAddModalState}/>
        </ModalForm> 
        : 
        <></>
      }

      {editModalVisible ? 
        <ModalForm title='Editar producto'>
          <EditProductForm updateModalState={updateEditModalState} name={selectedProduct}/>
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
              <div className={styles.tableContent}>
                {products.map((p, idx) => {
                  return (
                    <ul key={idx}>
                      <li>{p.name}</li>
                      <li>{p.category}</li>
                      <li>$ {p.price}</li>
                      <li>{p.inventory}</li>
                      <li className={styles.actions}>
                        <Button text={'Editar'} action={() => {
                          setSelectedProduct(p.name);
                          updateEditModalState();
                        }}/>
                        <Button text={'-'} action={() => {
                          remove(ref(db, `products/${p.name.toLowerCase()}`));
                          
                          setProducts((prevState) => {
                            return prevState.filter((pr) => 
                              pr.name.toLowerCase() !== p.name.toLowerCase());
                          });
                        }}/>
                      </li>
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

const AddProductForm = ({ updateModalState, firebaseApp }) => {
  const [ name, setName ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ inventory, setInventory ] = useState(1);

  const db = getDatabase(firebaseApp);

  const inputUpdate = (e, name) => {
    const updateFuncObj = {
      'name'      : setName,
      'category'  : setCategory,
      'price'     : setPrice,
      'inventory' : setInventory
    };
    
    updateFuncObj[name](e.target.value);
  };

  const addProduct = () => {
    const productName = name.toLowerCase();
    set(ref(db, 'products/' + productName), {
      name,
      category,
      price,
      inventory
    });
    updateModalState();
  };

  return (
    <div>
      <Input name='name' type='text' placeholder='Nombre' updateFunction={inputUpdate}/>
      <Input name='category' type='text' placeholder='Categoria' updateFunction={inputUpdate}/>
      <Input name='price' type='text' placeholder='Precio' updateFunction={inputUpdate}/>
      <Input name='inventory' type='text' placeholder='Inventario' updateFunction={inputUpdate}/>
      <Button text='Agregar' action={addProduct} />
      <Button text='Cancelar' type='cancel' action={updateModalState}/>
    </div>
  );
};

const EditProductForm = ({ updateModalState, firebaseApp, name }) => {
  const [ category, setCategory ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ inventory, setInventory ] = useState(1);

  const db = getDatabase(firebaseApp);

  const inputUpdate = (e, name) => {
    const updateFuncObj = {
      'category'  : setCategory,
      'price'     : setPrice,
      'inventory' : setInventory
    };
    
    updateFuncObj[name](e.target.value);
  };

  const editProduct = () => {
    const productName = name.toLowerCase();
    set(ref(db, 'products/' + productName), {
      name,
      category,
      price,
      inventory
    });
    updateModalState();
  };

  return (
    <div>
      <Input name='name' type='text' placeholder='Nombre' value={name} readonly={true} />
      <Input name='category' type='text' placeholder='Categoria' updateFunction={inputUpdate}/>
      <Input name='price' type='text' placeholder='Precio' updateFunction={inputUpdate}/>
      <Input name='inventory' type='text' placeholder='Inventario' updateFunction={inputUpdate}/>
      <Button text='Agregar' action={editProduct} />
      <Button text='Cancelar' type='cancel' action={updateModalState}/>
    </div>
  );
};

export default InventoryPage;