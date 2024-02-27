import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';

import { LogsContextProvider } from './context/LogsContext';
import { ExperimentsContextProvider } from './context/ExperimentsContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <LogsContextProvider>
      <ExperimentsContextProvider>
        <App />
      </ExperimentsContextProvider>
    </LogsContextProvider>

);
