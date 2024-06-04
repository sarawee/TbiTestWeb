"use client";

import React, { useState, useEffect } from "react";
import Cart from "@/components/Cart";
import Navbar from "@/components/Navbar";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartItemState } from "@/lib/recoil-atoms";
import { fetchProducts, postCheckout } from "@/utils/api";
import { CartItem, Product } from "@/types/Product";

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useRecoilState<CartItem[]>(cartItemState);
  const [cartVisible, setCartVisible] = useState<boolean>(false);

  const fetchAndSetProducts = async () => {
    const products = await fetchProducts();
    setProducts(products);
  };

  useEffect(() => {
    fetchAndSetProducts();
  }, []);

  const addToCart = (product: Product) => {
    setProducts((prevProduct) => {
      return prevProduct.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });

    setCart((prevCart) => {
      const existingCartItem = prevCart.find(
        (item) => item.productId === product.productId
      );
      if (existingCartItem) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, cartQty: item.cartQty + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, cartQty: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      setProducts((prevProduct) => {
        return prevProduct.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity:
                  prevCart.find((item) => item.productId === productId)
                    ?.quantity ?? item.quantity,
              }
            : item
        );
      });
      return prevCart.filter((item) => item.productId !== productId);
    });
  };

  const updateQuantity = (productId: number, cartQty: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item.productId === productId &&
          cartQty <= item.quantity &&
          cartQty >= 1
        ) {
          setProducts((prevProduct) => {
            return prevProduct.map((itemPr) =>
              itemPr.productId === productId
                ? {
                    ...itemPr,
                    quantity:
                      item.cartQty > cartQty
                        ? itemPr.quantity + 1
                        : itemPr.quantity - 1,
                  }
                : itemPr
            );
          });
        }
        return item.productId === productId &&
          cartQty <= item.quantity &&
          cartQty >= 1
          ? { ...item, cartQty }
          : item;
      })
    );
  };

  const clearCart = () => {
    setCart(() => []);
    fetchAndSetProducts();
  };

  const checkOut = async () => {
    try {
      await postCheckout(cart);
      setCart(() => []);
      fetchAndSetProducts();
      alert("Checkout Successful");
    } catch (error) {
      alert("Checkout Error");
    }
  };

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h1>Shop</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {products.map((product) => (
            <div
              key={product.productId}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                width: "200px",
              }}
            >
              <h2>{product.name}</h2>
              <p>Price: {product.price.toFixed(2)} THB</p>
              <p>Quantity: {product.quantity}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded disabled:opacity-50"
                onClick={() => addToCart(product)}
                disabled={product.quantity < 1}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <Cart
          products={products}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          checkOut={checkOut}
        />
      </div>
    </div>
  );
};

export default Shop;
