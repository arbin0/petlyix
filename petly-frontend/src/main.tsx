import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Roboto, sans-serif',
  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '36' },
    },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider theme = {theme}>
    
  <React.StrictMode>
    
    <App />
    
  </React.StrictMode>
  </MantineProvider>
);