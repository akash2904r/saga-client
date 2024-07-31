import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux';
import { PrimeReactProvider } from "primereact/api";

import { store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

import App from './App.tsx'
import './index.css'

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <PrimeReactProvider>
            <App />
          </PrimeReactProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
