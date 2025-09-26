"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { Topping, ToppingCardType } from "@/lib/types";

const ToppingCard = ({
  topping,
  selectedToppings,
  handleCheckBoxCheck,
}: ToppingCardType) => {
  console.log("topping", topping, "selectedToppings", selectedToppings);
  const isCurrentSelected = selectedToppings.some(
    (element) => element.id === topping.id
  );

  return (
    <Button
      onClick={() => handleCheckBoxCheck(topping)}
      variant={"outline"}
      className={cn(
        "flex flex-col h-42 w-32 relative my-10 bg-white",
        isCurrentSelected ? "border-primary" : ""
      )}
    >
      <Image
        src={topping?.image}
        width={150}
        height={150}
        alt={topping?.name}
      />
      <h4>{topping?.name}</h4>
      <p>&#8377;{topping?.price}</p>
      {isCurrentSelected && (
        <CircleCheck className="absolute top-1 right-1 text-primary" />
      )}
    </Button>
  );
};

export default ToppingCard;
