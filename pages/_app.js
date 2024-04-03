import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import {serverStore} from "../Redux/store/store";
import {PersistGate} from  "redux-persist/integration/react";
import {Provider} from "react-redux";
import '../i18n/locales/confiq';

export default function App({ Component, pageProps }) {
    
  return (
      <Provider store={serverStore}>
          <PersistGate loading = {<Component {...pageProps} />} persistor={serverStore?._PERSISTOR}>
            <Component {...pageProps} />
          </PersistGate>
      </Provider>
  )
}
