import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import OrderStatus from "./components/orderStatus";
import { Separator } from "@/components/ui/separator";
import { Banknote, Coins, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { Order } from "@/lib/types";

const SingleOrder = async ({ params }: { params: { orderId: string } }) => {
  console.log(params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_ORDER_SERVICE_API}/orders/${params?.orderId}?fields=address,paymentStatus,paymentMode`,
    {
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch single order");
    // window.location.href = "/";
    // throw new Error("Failed to fetch single order");
  }
  const orderData = await response.json();

  return (
    <div className="container m-8 flex flex-col gap-2">
      {orderData?.data?.orderDto ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Order</CardTitle>
              <CardDescription>Track the order status. </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderStatus orderId={orderData?.data?.orderDto?._id} />
            </CardContent>
          </Card>
          <div className="flex gap-6">
            <Card className="w-1/3">
              <CardHeader className="p-4">
                <CardTitle className="flex items-start text-lg justify-between gap-12">
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <h2 className="font-bold">
                  {orderData?.data?.orderDto?.customerId?.firstName +
                    " " +
                    orderData?.data?.orderDto?.customerId?.lastName}
                </h2>
                <p className="mt-2">{orderData?.data?.orderDto?.address}</p>
              </CardContent>
            </Card>

            <Card className="w-2/3">
              <CardHeader className="p-4">
                <CardTitle className="flex items-start text-lg justify-between gap-12">
                  Your order information
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <LayoutDashboard size={20} />
                  <h2 className="text-base font-medium">Order reference: </h2>
                  {orderData?.data?.orderDto?._id}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Banknote />
                  <h2 className="text-base font-medium">Payment status: </h2>
                  <span>
                    {orderData?.data?.orderDto?.paymentStatus.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Coins size={20} />
                  <h2 className="text-base font-medium">Payment method: </h2>
                  <span>
                    {orderData?.data?.orderDto.paymentMode.toUpperCase()}
                  </span>
                </div>

                <Button variant={"destructive"} className="mt-6">
                  Cancel Order
                </Button>
              </CardContent>
            </Card>
          </div>{" "}
        </>
      ) : (
        <h1>No Order Data</h1>
      )}
    </div>
  );
};

export default SingleOrder;
