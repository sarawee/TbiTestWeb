import { cartItemState } from "@/lib/recoil-atoms";
import React from "react";
import { useRecoilValue } from "recoil";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const useCartItem = () => ({
  cartItem: useRecoilValue(cartItemState)
});

const Cart: React.FC<CartProps> = ({
  cart,
  removeFromCart,
  updateQuantity,
}) => {
  const { cartItem } = useCartItem();
  console.log(cartItem);
  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
              <tr key={item.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.name}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  ${item.price.toFixed(2)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    style={{ width: "50px" }}
                  />
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;