'use client';

import React, { useState, useEffect } from 'react';
import Cart from './cart';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  return [
    { id: 1, name: 'Product 1', price: 19.99, description: 'Description for product 1' },
    { id: 2, name: 'Product 2', price: 29.99, description: 'Description for product 2' },
    { id: 3, name: 'Product 3', price: 39.99, description: 'Description for product 3' },
  ];
};

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    fetchAndSetProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingCartItem = prevCart.find((item) => item.id === product.id);

      if (existingCartItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div>
      <h1>Shop</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px', width: '200px' }}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
    </div>
  );
};

export default Shop;
