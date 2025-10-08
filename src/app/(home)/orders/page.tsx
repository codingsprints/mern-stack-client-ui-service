import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import OrderList from "./components/OrderList";

const Orders = async () => {
  return (
    <div className="container mt-8">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>My complete order history.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderList />
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
