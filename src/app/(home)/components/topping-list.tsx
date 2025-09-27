import { Topping } from "@/lib/types";
import { FetchToppings } from "@/services/topping.service";
import React from "react";
import ToppingCard from "./topping-card";
import { useSearchParams } from "next/navigation";

const ToppingList = ({
  selectedToppings,
  handleCheckBoxCheck,
}: {
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
}) => {
  const searchParams = useSearchParams();
  const { data: toppingData, isLoading } = FetchToppings(
    searchParams.get("restaurantId") || ""
  );

  return (
    <div className="mt-2">
      <p>Extra toppings</p>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-wrap gap-2 ">
          {toppingData?.data?.toppingDto?.map((topping: Topping) => {
            return (
              <ToppingCard
                topping={topping}
                key={topping.id}
                selectedToppings={selectedToppings}
                handleCheckBoxCheck={handleCheckBoxCheck}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ToppingList;
