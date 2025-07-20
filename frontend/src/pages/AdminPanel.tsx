import React from 'react';
import { Button } from 'react-bootstrap';

const AdminPanel: React.FC = () => {
  return (
    <div>
      <h2>Panel de Administración</h2>
      <Button>Agregar Producto</Button>
      <Button>Ver Pedidos</Button>
    </div>
  );
};

export default AdminPanel;
