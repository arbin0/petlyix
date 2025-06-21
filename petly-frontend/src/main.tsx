import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({

});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider theme = {theme}>
  <React.StrictMode>
    
    <App />
    
  </React.StrictMode>
  </MantineProvider>
);