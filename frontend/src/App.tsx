import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Cart from './pages/Cart';

// Definición de productos con _id: string
const products = [
  {
    _id: '1',
    name: 'Paracetamol 500mg',
    description: 'Alivio del dolor y fiebre',
    price: 5.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/03/05/22/23/tablets-1238990_960_720.jpg',
  },
  {
    _id: '2',
    name: 'Ibuprofeno 400mg',
    description: 'Antiinflamatorio',
    price: 7.50,
    imageUrl: 'https://cdn.pixabay.com/photo/2017/01/31/22/20/medicine-2022237_960_720.jpg',
  },
  {
    _id: '3',
    name: 'Vitaminas C',
    description: 'Fortalece tu sistema inmunológico',
    price: 10.00,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/04/15/11/47/vitamins-1334369_960_720.jpg',
  },
];

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos products={products} />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
