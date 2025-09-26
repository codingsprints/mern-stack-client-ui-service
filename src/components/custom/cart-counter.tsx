"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const CartCounter = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const searchParams = useSearchParams();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  if (!mounted) {
    // Render nothing or fallback to 0 on server
    return (
      <div className="relative">
        <Link href={`/cart?restaurantId=${searchParams.get("restaurantId")}`}>
          <ShoppingBasket className="hover:text-primary" />
        </Link>
        <p className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
          0
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Link href={`/cart?restaurantId=${searchParams.get("restaurantId")}`}>
        <ShoppingBasket className="hover:text-primary" />
      </Link>
      <p className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
        {cartItems.length}
      </p>
    </div>
  );
};

export default CartCounter;
