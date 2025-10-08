// import { CartItem } from '../store/features/cart/cartSlice';

import { CartItem } from "../store/features/cart/cartSlice";

export interface Tenant {
  id: string;
  name: string;
  address: string;
}

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "aditional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}

export type ProductAttribute = {
  name: string;
  value: string | boolean;
};

export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "aditional";
    availableOptions: {
      [key: string]: number;
    };
  };
}

export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: Category;
  priceConfiguration: ProductPriceConfiguration;
  attributes: ProductAttribute[];
  isPublish: boolean;
  createdAt: string;
};

export type Topping = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type Address = {
  text: string;
  isDefault: boolean;
};

export type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
};

export type CouponCodeData = {
  code: string;
  tenantId: string;
};

export type OrderData = {
  cart: CartItem[];
  couponCode: string;
  tenantId: string;
  customerId: string;
  comment: string;
  address: string;
  paymentMode: string;
};

export interface Order {
  _id: string;
  customerId: Customer;
  total: number;
  discount: number;
  taxes: number;
  deliveryCharges: number;
  address: string;
  tenantId: string;
  comment?: string;
  paymentMode: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
}

export type CreateTenantsType = {
  name: string;
  address: string;
};

export type ChosenConfig = {
  [key: string]: string;
};

export type ToppingCardType = {
  topping: Topping;
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
};
export type tenantQueryParams = {
  perPage: number;
  currentPage: number;
  q?: string;
};

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "customer" | "manager";
  tenant: number | null;
}

export interface Session {
  user: User;
}

export type Credentials = {
  email: string;
  password: string;
};

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "customer" | "manager";
  tenant: number | null;
}

export interface Session {
  user: User;
}

export enum OrderStatus {
  RECEIVED = "received",
  CONFIRMED = "confirmed",
  PREPARED = "prepared",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
}
