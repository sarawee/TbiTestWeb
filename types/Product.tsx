export interface Product {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem extends Product {
  cartQty: number;
}