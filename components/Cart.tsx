import { cartItemState, cartVisibleState } from "@/lib/recoil-atoms";
import { CartItem, Product } from "@/types/Product";
import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";

interface CartProps {
  products: Product[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  checkOut: () => void;
}

const Cart: React.FC<CartProps> = ({ products, removeFromCart, updateQuantity, clearCart, checkOut }) => {
  const cartRef = useRef<HTMLDivElement>(null);
  const [cartVisible, setCartVisible] =
    useRecoilState<boolean>(cartVisibleState);
  const [cart] = useRecoilState<CartItem[]>(cartItemState);

  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setCartVisible(false);
    }
  };

  useEffect(() => {
    if (cartVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div
      ref={cartRef}
      className={`fixed top-0 right-0 h-full w-[30rem] bg-[#1da1f2] shadow-lg transform transition-transform duration-300 ${
        cartVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <h2 className="p-4 text-lg font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table className="mb-2" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Product
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Price
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Quantity
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Total
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.productId}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.name}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.price.toFixed(2)}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    color: "black",
                  }}
                >
                  <input
                    type="number"
                    value={item.cartQty}
                    onChange={(e) =>
                      updateQuantity(item.productId, parseInt(e.target.value))
                    }
                    style={{ width: "50px" }}
                  />
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {(item.price * item.cartQty).toFixed(2)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <button onClick={() => removeFromCart(item.productId)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cart.length > 0 && (
        <button className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded mr-4"  onClick={() => clearCart()}>
          Clear Cart
        </button>
      )}

      {cart.length > 0 && (
        <button className="bg-orange-500 hover:bg-orange-700 py-2 px-4 rounded"  onClick={() => checkOut()}>
          Check out
        </button>
      )}
    </div>
  );
};

export default Cart;
