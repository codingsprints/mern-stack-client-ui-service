"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/lib/types";
import Link from "next/link";
import { GetOrders } from "@/services/order.service";

const OrderList = () => {
  const { data: ordersData } = GetOrders();
  return (
    <>
      {ordersData?.data?.orderDto?.length === 0 ? (
        "No orders yet."
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Date Time</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersData?.data?.orderDto?.map((order: Order) => {
              return (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order._id}</TableCell>
                  <TableCell>{order.paymentStatus.toUpperCase()}</TableCell>
                  <TableCell>{order.paymentMode}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>
                    <Badge variant={"outline"}>
                      {order.orderStatus.toUpperCase()}
                    </Badge>
                  </TableCell>
                  {/* todo: make sure the total is grand total */}
                  <TableCell>₹{order.total}</TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/order/${order._id}`}
                      className="underline text-primary"
                    >
                      More details
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default OrderList;
