import { Topping } from "@/lib/types";
import { FetchToppings } from "@/services/topping.service";
import React from "react";
import ToppingCard from "./topping-card";

const ToppingList = ({
  selectedToppings,
  handleCheckBoxCheck,
}: {
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
}) => {
  const { data: toppingData, isLoading } = FetchToppings("2");
  console.log(toppingData);

  return (
    <div className="mt-2">
      <p>Extra toppings</p>
      {!isLoading && (
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
