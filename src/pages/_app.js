import '../../globals.css';
import Layout from '../components/Layout';
import 'animate.css/animate.min.css';
import { AuthProvider } from '../../contexts/authContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
