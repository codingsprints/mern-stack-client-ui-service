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
  const { data: toppingData } = FetchToppings("2");
  console.log(toppingData);

  return (
    <>
      <section className="mt-6">
        <h3>Extra toppings</h3>
        <div className="grid grid-cols-3 gap-4">
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
      </section>
    </>
  );
};

export default ToppingList;
