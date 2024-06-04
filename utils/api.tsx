import { CartItem, Product } from "@/types/Product";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("https://localhost:7020/Product");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const postCheckout = async (cartItem: CartItem[]): Promise<boolean> => {
  try {
    const response = await fetch('https://localhost:7020/CheckOut', {
      method: "POST",
      body: JSON.stringify(cartItem),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to checkout");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checkout:", error);
    return false;
  }
};
