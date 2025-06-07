// Description: TypeScript interfaces for user, product, cart, and order data structures.

export interface UserType {
  id: string;
  email: string;
  username: string;
}

export interface UserProfileType {
  id: number;
  user: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  billing_address: string;
  shipping_address: string;
}

export interface AuthType {
  user: UserType | null;
  access: string | null;
  refresh: string | null;
}

export interface CartItemType {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  color: string;
  size: string;
  quantity: number;
  total_price: number;
}

export interface CartType {
  id: number;
  user: number;
  created_at: string;
  updated_at: string;
  items: CartItemType[];
  total_price: number;
}

type ColorOption = {
  color: string;
  in_stock: boolean;
};

type StorageOption = {
  size: string;
  in_stock: boolean;
};

export type AuthHeaders = {
  Authorization: string;
};

export interface Product {
  id: number;
  name: string;
  brand: string | number;
  category: string;
  description: string;
  image: string;
  price: string | number;
  stock: number;
  colors: ColorOption[];
  storage: StorageOption[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface OrderSummaryType {
  id: number;
  placed_at: string;
  items: CartItemType[];
  status: string;
  billing_address: string;
  shipping_address: string;
  payment_method: string;
  card?: { card_number: string; expiry: string };
  total_price: number;
}

export interface OrderType {
  id: number;
  user: number;
  billing_address: string;
  shipping_address: string;
  card: string | null;
  payment_method: string;
  placed_at: string;
  status: string;
  total_price: number;
  items: CartItemType[];
}

export type CartSummaryProps = {
  totalPrice: number;
};
