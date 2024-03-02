import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';

import { LogsContextProvider } from './context/LogsContext';
import { ExperimentsContextProvider } from './context/ExperimentsContext';

import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const root = ReactDOM.createRoot(document.getElementById('root'));

const clientID = "415073517857-9dqb2modgtnhq3g59n284c4de2c4d2h9.apps.googleusercontent.com";

root.render(
  <GoogleOAuthProvider clientId="415073517857-9dqb2modgtnhq3g59n284c4de2c4d2h9.apps.googleusercontent.com">
      <LogsContextProvider>
        <ExperimentsContextProvider>
          <App></App>
        </ExperimentsContextProvider>
      </LogsContextProvider>
    </GoogleOAuthProvider>
);
