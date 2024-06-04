import React from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { cartItemState, cartVisibleState } from "@/lib/recoil-atoms";
import { CartItem } from "@/types/Product";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [cart] = useRecoilState<CartItem[]>(cartItemState);
  const [cartVisible, setCartVisible] = useRecoilState<boolean>(cartVisibleState);

  const onCartClick = () => {
    setCartVisible(true);
  };
  // const onCartClick = (product: Product) => {
  //   setCart((prevCart) => {
  //     const existingCartItem = prevCart.find((item) => item.id === product.id);
  //     if (existingCartItem) {
  //       return prevCart.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     } else {
  //       return [...prevCart, { ...product, quantity: 1 }];
  //     }
  //   });
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#333",
        color: "#fff",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>
        <Link href="/shop" style={{ color: "#fff", textDecoration: "none" }}>
          Shop
        </Link>
      </div>
      <div style={{ cursor: "pointer" }} onClick={onCartClick}>
        
      <ShoppingCartIcon className="h-6 w-6 text-white" />
        {cart.length > 0 && (
        <span className="absolute top-3 right-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {cart.length}
        </span>
      )}
      </div>
    </div>
  );
};

export default Navbar;
