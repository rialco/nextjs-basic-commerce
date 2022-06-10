import { useRouter } from 'next/router';
import Image from 'next/image';

import RightNavMenu from './rightNavMenu';
import styles from '../styles/components/navbar.module.scss';

import logo from '../public/images/logo-brocolini.png';

const Navbar = () => {
  const router = useRouter();  

  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div>
          <Image 
            className={styles.logo} 
            src={logo} 
            alt={'Brocolini logo'} 
            width={263} 
            height={57} 
            onClick={goToHome}
          />
        </div>
        <div>
          <RightNavMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;