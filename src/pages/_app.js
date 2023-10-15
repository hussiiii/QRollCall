import '../../globals.css';
import Layout from '../components/Layout';
import 'animate.css/animate.min.css';
import { AuthProvider } from '../../contexts/authContext';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
      <Head>
          <link rel="preload" href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" as="style" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
