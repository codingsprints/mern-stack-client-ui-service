export const couponEndpoint = {
  createCoupon: `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/coupon`,
  updateCoupon: (id: string) =>
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/coupon/${id}`,
  deleteCoupon: (id: string) =>
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/coupon/${id}`,
  getCoupon: `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/coupon`,
  verifyCoupon: `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/coupon/verify`,
};
