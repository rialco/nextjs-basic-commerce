import Image from 'next/image';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import Navbar from '../components/navbar';
import Input from '../components/input';
import Button from '../components/button';
import styles from '../styles/pages/home.module.scss';

import authPromo from '../public/images/FrontEnd_FinalProyect-01.png';

function RegisterPage({ firebaseApp }) {
  const auth = getAuth(firebaseApp);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ username, setUser ] = useState('');

  const inputUpdate = (e, name) => {
    const updateFuncObj = {
      'email'    : setEmail,
      'password' : setPassword,
      'username' : setUser
    };
    updateFuncObj[name](e.target.value);
  };

  const register = async (updateBtn) => {
    updateBtn();

    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = credentials.user;
      alert(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }

    updateBtn();
  };

  return (
    <>
      <Navbar />
      <div className={styles.heroContainer}>
        <div className={styles.hero}>
          <div className={styles.column}>
            <h2 className={styles.title}>Bienvenido!</h2>
            <div className={styles.form}>
              <Input name='email' type='text' placeholder='Correo' updateFunction={inputUpdate}/>
              <Input 
                name='password' 
                type='password' 
                placeholder='Contraseña' 
                updateFunction={inputUpdate}/>
              <Input 
                name='username' 
                type='text' 
                placeholder='Nombre de usuario' 
                updateFunction={inputUpdate}/>
            </div>
            <Button action={register} text='Registrarme' />
          </div>
          <div className={styles.column}>
            <Image src={authPromo} alt='Home hero' width={653} height={896} />
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
