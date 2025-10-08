export const orderEndPoint = {
  createOrder: `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/orders`,
  getOrders: `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/orders/mine`,
  getAllOrders: `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/orders`,
  getSingleOrder: (id: string) =>
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/orders/${id}?fields=orderStatus`,
  updateOrder: (id: string) =>
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/orders/${id}`,
};
