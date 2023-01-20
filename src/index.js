import React from 'react';
import ReactDOM from 'react-dom/client';
import Materials from './components/Materials';
import './styles/index.css';

const baseURL = "http://localhost:3001/materials";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Materials targetURL={baseURL}/>
  </React.StrictMode>
);