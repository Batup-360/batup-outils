import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { capturerPagePrerendue } from './lib/page-prerendue';

const racine = document.getElementById('root')!;
capturerPagePrerendue(racine);

ReactDOM.createRoot(racine).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
