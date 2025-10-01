export const customerEndpoint = {
  getCustomer: `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/customers`,
  updateCustomerAddress: (id: string) =>
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/customers/addresses/${id}`,
};
