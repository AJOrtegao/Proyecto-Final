import React from 'react';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductosProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const Productos: React.FC<ProductosProps> = ({ products, addToCart }) => {
  if (products.length === 0) {
    return <div className="container mt-4">No hay productos disponibles.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>📦 Nuestros Productos</h2>
      <h2 className="mb-4">Productos disponibles</h2>
      <div className="d-flex flex-wrap justify-content-start">
        {products.map((product) => (
          <div key={product._id} className="mb-4">
            <ProductCard product={product} />
            <Button 
              variant="primary" 
              onClick={() => addToCart(product)} 
              className="mt-2"
            >
              Agregar al carrito
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
