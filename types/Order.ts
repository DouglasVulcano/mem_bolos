import { Product } from "./Product";

export type OrderItem = Product & {
  quantity: number;
};

export type OrderAddress = {
  city: string;
  complement: string;
  number: number;
  zipCode: string;
  neighborhood: string;
  state: string;
  street: string;
};

export type Order = {
  id: string;
  createdAt: Date;
  customerName: string;
  items: OrderItem[];
  price: number;
  shippingAddress: OrderAddress;
};
