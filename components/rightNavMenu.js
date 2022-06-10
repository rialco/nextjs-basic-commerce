import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import styles from '../styles/components/rightNavMenu.module.scss';

const RightNavMenu = ({ firebaseApp }) => {
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  const [ isLogged, setLogged ] = useState(false);
  const [ email, setEmail ] = useState('');

  const notLoggedPaths = [ '/', '/index', '/login', '/register' ];


  useEffect(() => {
    const authSubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
        setEmail(user.email);
        if (notLoggedPaths.includes(router.pathname)) router.push('/inventory');
      } else {
        setLogged(false);
      }
    });
  
    return () => {
      authSubscriber();
    };
  }, []);
  

  return (isLogged ? <LoggedMenu email={email} /> : <HomeMenu/>);
};

const HomeMenu = () => {
  const router = useRouter();
  
  const goToLink = (href) => {
    router.push(href);
  }; 

  return (
    <>
      <ul className={styles.navigation}>
        <li onClick={() => {
          goToLink('/login');
        }}>
            Ingresa
        </li>
        <li onClick={() => {
          goToLink('/register');
        }}>
            Regístrate
        </li>
      </ul>  
    </>
  );
};

const LoggedMenu = ({ email, firebaseApp }) => {
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  
  const logOut = () => {
    auth.signOut();
    router.push('/');
  }; 

  return (
    <>
      <ul className={styles.navigation}>
        <li onClick={logOut}>
          {email}
        </li>
      </ul>  
    </>
  );
};

export default RightNavMenu;