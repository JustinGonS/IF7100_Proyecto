import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
//import Cotizacion from './pages/Cotizacion';
//import Mensajes from './pages/Mensajes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Ruta para los Mensajes (chat) */}
        <Route path="/mensajes" element={<Mensajes />} />
      </Routes>
    </Router>
  );
}

export default App;
