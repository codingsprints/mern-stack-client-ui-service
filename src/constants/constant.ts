// export const AUTH_SERVICE = `/pizza/auth/api/v1`;
// export const CATALOG_SERVICE = `/pizza/catalog/api/v1`;

export const ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  MANAGER: "manager",
};

export const CATEGORIES = {
  VEG: "veg-pizza",
  PIZZA: "Pizza",
  NON_VEG: "nonveg-pizza",
  BEVERAGES: "Beverages",
};

export const PER_PAGE = 6;

export const CURRENT_PAGE = 1;

export const DELIVERY_CHARGES = 100;
export const TAXES_PERCENTAGE = 18;

export const list = [
  {
    OrderSummary: "Peperoni, Margarita ...",
    address: "Bandra, Mumbai",
    amount: 1200,
    status: "preparing",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
];

export enum PaymentMode {
  CARD = "card",
  CASH = "cash",
}
