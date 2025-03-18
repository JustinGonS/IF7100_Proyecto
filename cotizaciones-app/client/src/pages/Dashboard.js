// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Bienvenido al Panel de Cotizaciones</h1>
      <div>
        <h2>Historial de Cotizaciones</h2>
        <ul>
          <li><Link to="/cotizacion/1">Cotización 1</Link></li>
          <li><Link to="/cotizacion/2">Cotización 2</Link></li>
        </ul>
      </div>
      <div>
        <h2>Mensajes</h2>
        <button>Ver Mensajes</button>
      </div>
    </div>
  );
};

export default Dashboard;
