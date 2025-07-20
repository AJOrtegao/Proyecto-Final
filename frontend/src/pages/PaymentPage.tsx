import React, { useState } from 'react';

interface PaymentPageProps {
  total: number;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ total }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cardNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Pago de $${total} realizado con éxito`);
  };

  return (
    <div>
      <h2>Total a pagar: ${total}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Dirección"
          required
        />
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="Número de tarjeta"
          required
        />
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
};

export default PaymentPage;
