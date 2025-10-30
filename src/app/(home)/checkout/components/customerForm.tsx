"use client";
import React from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Coins, CreditCard } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
// import { createOrder, getCustomer } from "@/lib/http/api";
import { Address, OrderData } from "@/lib/types";
import AddAdress from "./addAddress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import OrderSummary from "./orderSummary";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useSearchParams } from "next/navigation";
import { clearCart } from "@/lib/store/features/cart/cartSlice";
import { GetCustomer } from "@/services/customer.service";
import { orderQueryKey } from "@/constants/query-keys/order.query-keys";
import { axiosInstance } from "@/utils/axios";
import { orderEndPoint } from "@/constants/api-endpoint/order.api-endpoint";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { PaymentMode } from "@/constants/constant";

const formSchema = z.object({
  address: z.string({ error: "Please select an address." }),
  paymentMode: z.enum(["card", "cash"], {
    error: "You need to select a payment mode type.",
  }),
  comment: z.any(),
});

export type LoginFormValues = z.infer<typeof formSchema>;

const CustomerForm = () => {
  const dispatch = useAppDispatch();
  const chosenCouponCode = React.useRef("");
  const idempotencyKeyRef = React.useRef("");

  const customerForm = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
  });

  const searchParam = useSearchParams();

  const cart = useAppSelector((state) => state.cart);

  const { data: customerData, isLoading: customerIsLoading } = GetCustomer();

  const { mutate: createOrderMutate, isPending: isPlaceOrderPending } =
    useMutation({
      mutationKey: [orderQueryKey.createOrder],
      mutationFn: async (details: OrderData) => {
        const idempotencyKey = idempotencyKeyRef.current
          ? idempotencyKeyRef.current
          : (idempotencyKeyRef.current =
              uuidv4() + customerData?.data?.customerDto?._id);
        const { data } = await axiosInstance.post(
          orderEndPoint.createOrder,
          details,
          {
            headers: {
              "Idempotency-Key": idempotencyKey,
            },
          }
        );
        return data;
      },
      retry: 3,
      onSuccess(data) {
        console.log("-------------------------1----------------", data);
        if (
          data?.data?.paymentUrl &&
          data?.data?.orderDto[0]?.paymentMode === PaymentMode.CARD
        ) {
          toast.info("redirect to payment");
          window.location.href = data?.data?.paymentUrl;
          // dispatch(clearCart());
        }

        if (!data?.data?.paymentUrl) {
          toast.success(data?.message);
          dispatch(clearCart());
        }
      },
      onError(error) {
        const err = error as AxiosError<any>; // cast error to AxiosError
        console.log("err --------------------", err);
        toast.error(err?.response?.data?.error?.message);
      },
    });
  // const { mutate: createOrderMutate } = CreateOrder();

  console.log("customerData ->", customerData);

  //   const { data: customer, isLoading } = useQuery<Customer>({
  //     queryKey: ["customer"],
  //     queryFn: async () => {
  //       return await getCustomer().then((res) => res.data);
  //     },
  //   });

  //   const { mutate, isPending: isPlaceOrderPending } = useMutation({
  //     mutationKey: ["order"],
  //     mutationFn: async (data: OrderData) => {
  //       const idempotencyKey = idempotencyKeyRef.current
  //         ? idempotencyKeyRef.current
  //         : (idempotencyKeyRef.current = uuidv4() + customer?._id);

  //       return await createOrder(data, idempotencyKey).then((res) => res.data);
  //     },
  //     retry: 3,
  //     onSuccess: (data: { paymentUrl: string | null }) => {
  //       if (data.paymentUrl) {
  //         window.location.href = data.paymentUrl;
  //       }

  //       alert("Order placed successfully!");
  //       dispatch(clearCart());

  //       // todo: This will happen if payment mode is Cash.
  //       // todo: 1. Clear the cart 2. Redirect the user to order status page.
  //     },
  //   });

  //   if (isLoading) {
  //     // todo: use Spinner/Loader or Shadcn Skeleton
  //     return <h3>Loading...</h3>;
  //   }

  const handlePlaceOrder = async (data: LoginFormValues) => {
    const tenantId = searchParam.get("restaurantId");
    if (!tenantId) {
      alert("Restaurant Id is required!");
      return;
    }
    console.log("handlePlaceOrder", data);
    const orderData: OrderData = {
      cart: cart?.cartItems,
      couponCode: chosenCouponCode?.current ? chosenCouponCode?.current : "",
      tenantId: tenantId,
      customerId: customerData ? customerData?.data?.customerDto?._id : "",
      comment: data?.comment,
      address: data?.address,
      paymentMode: data?.paymentMode,
    };

    console.log(orderData);

    createOrderMutate(orderData);
  };

  return (
    <>
      {customerIsLoading ? (
        <h3>Loading...</h3>
      ) : (
        <Form {...customerForm}>
          <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
            <div className="flex items-center justify-center container gap-5 m-5">
              <Card className="w-3/5 border-none">
                <CardHeader>
                  <CardTitle>Customer details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="fname">First Name</Label>
                      <Input
                        id="fname"
                        type="text"
                        className="w-full"
                        defaultValue={
                          customerData?.data?.customerDto?.firstName
                        }
                        disabled
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="lname">Last Name</Label>
                      <Input
                        id="lname"
                        type="text"
                        className="w-full"
                        defaultValue={
                          customerData?.data?.customerDto?.firstName
                        }
                        disabled
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="text"
                        className="w-full"
                        defaultValue={customerData?.data?.customerDto?.email}
                        disabled
                      />
                    </div>
                    <div className="grid gap-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="name">Address</Label>
                          <AddAdress
                            customerId={customerData?.data?.customerDto?._id}
                          />
                        </div>

                        <FormField
                          name="address"
                          control={customerForm.control}
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    className="grid grid-cols-2 gap-6 mt-2"
                                  >
                                    {customerData?.data?.customerDto?.addresses?.map(
                                      (address: Address) => {
                                        return (
                                          <Card
                                            className="p-6"
                                            key={address.text}
                                          >
                                            <div className="flex items-center space-x-2">
                                              <FormControl>
                                                <RadioGroupItem
                                                  value={address.text}
                                                  id={address.text}
                                                />
                                              </FormControl>
                                              <Label
                                                htmlFor={address.text}
                                                className="leading-normal"
                                              >
                                                {address.text}
                                              </Label>
                                            </div>
                                          </Card>
                                        );
                                      }
                                    )}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label>Payment Mode</Label>
                      <FormField
                        name="paymentMode"
                        control={customerForm.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  className="flex gap-6"
                                >
                                  <div className="w-36">
                                    <FormControl>
                                      <RadioGroupItem
                                        value={"card"}
                                        id={"card"}
                                        className="peer sr-only"
                                        aria-label={"card"}
                                      />
                                    </FormControl>
                                    <Label
                                      htmlFor={"card"}
                                      className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                      <CreditCard size={"20"} />
                                      <span className="ml-2">Card</span>
                                    </Label>
                                  </div>
                                  <div className="w-36">
                                    <FormControl>
                                      <RadioGroupItem
                                        value={"cash"}
                                        id={"cash"}
                                        className="peer sr-only"
                                        aria-label={"cash"}
                                      />
                                    </FormControl>
                                    <Label
                                      htmlFor={"cash"}
                                      className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                      <Coins size={"20"} />
                                      <span className="ml-2 text-md">Cash</span>
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="fname">Comment</Label>
                      <FormField
                        name="comment"
                        control={customerForm.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <OrderSummary
                isPlaceOrderPending={isPlaceOrderPending}
                handleCouponCodeChange={(code) => {
                  chosenCouponCode.current = code;
                }}
              />
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default CustomerForm;
