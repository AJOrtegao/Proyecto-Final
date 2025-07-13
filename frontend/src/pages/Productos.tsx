import React from 'react';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductosProps {
  products: Product[];
}

const Productos: React.FC<ProductosProps> = ({ products }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Productos disponibles</h2>
      <div className="d-flex flex-wrap justify-content-start">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Productos;
