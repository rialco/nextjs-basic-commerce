import '../styles/globals.scss';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase.config';

const app = initializeApp(firebaseConfig);

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} firebaseApp={app}/>;
}
