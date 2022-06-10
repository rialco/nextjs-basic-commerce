import { useRouter } from 'next/router';
import Image from 'next/image';

import Navbar from '../components/navbar';
import Button from '../components/button';
import styles from '../styles/pages/home.module.scss';

import homePromo from '../public/images/FrontEnd_FinalProyect-02.png';

function HomePage() {
  const router = useRouter();

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <>
      <Navbar />
      <div className={styles.heroContainer}>
        <div className={styles.hero}>
          <div className={styles.column}>
            <h2 className={styles.title}>Tus verduras favoritas, más frescas que nunca!</h2>
            <p className={styles.paragraph}>¿Qué esperas para ingresar? Tu brocolini te extraña.</p>
            <Button action={goToRegister} text='Registrarme' />
          </div>
          <div className={styles.column}>
            <Image src={homePromo} alt='Home hero' width={653} height={896} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

