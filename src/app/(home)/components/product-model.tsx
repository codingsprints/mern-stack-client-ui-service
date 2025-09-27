import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChosenConfig, Product, Topping } from "@/lib/types";
import Image from "next/image";
import React, { startTransition, Suspense, useState } from "react";
import ToppingList from "./topping-list";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/constants/constant";
import { addToCart, CartItem } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { hashTheItem } from "@/lib/utils";
import { toast } from "sonner";
import { SucessToast } from "@/components/custom/SucessToast";

const ProductModal = ({ product }: { product: Product }) => {
  const defaultConfiguration = Object.entries(
    product.category.priceConfiguration
  )
    .map(([key, value]) => {
      return { [key]: value.availableOptions[0] };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const [chosenConfig, setChosenConfig] = useState<ChosenConfig>(
    defaultConfiguration as unknown as ChosenConfig
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([]);

  const cartItems = useAppSelector((state) => state?.cart?.cartItems);
  const dispatch = useAppDispatch();
  const totalPrice = React.useMemo(() => {
    const toppingsTotal = selectedToppings.reduce(
      (acc, curr) => acc + curr.price,
      0
    );

    const configPricing = Object.entries(chosenConfig).reduce(
      (acc, [key, value]: [string, string]) => {
        const price = product.priceConfiguration[key].availableOptions[value];
        return acc + price;
      },
      0
    );
    return configPricing + toppingsTotal;
  }, [chosenConfig, selectedToppings, product]);

  const alreadyHasInCart = React.useMemo(() => {
    const currentConfiguration = {
      _id: product._id,
      name: product.name,
      image: product.image,
      priceConfiguration: product.priceConfiguration,
      chosenConfiguration: {
        priceConfiguration: { ...chosenConfig },
        selectedToppings: selectedToppings,
      },
      qty: 1,
    };

    const hash = hashTheItem(currentConfiguration);
    return cartItems.some((item) => item.hash === hash);
  }, [product, chosenConfig, selectedToppings, cartItems]);

  const handleRadioChange = (key: string, data: string) => {
    /**
          {
            Size: "Medium",
            Crust: "Thin"
        }
         */

    startTransition(() => {
      setChosenConfig((prev) => {
        return { ...prev, [key]: data };
      });
    });
  };

  const handleCheckBoxCheck = (topping: Topping) => {
    // console.log("topping clicked", topping, selectedToppings);
    const isAlreadyExists = selectedToppings.some(
      (element: Topping) => element.id === topping.id
    );

    startTransition(() => {
      if (isAlreadyExists) {
        setSelectedToppings((prev) =>
          prev.filter((elm: Topping) => elm.id !== topping.id)
        );
        return;
      }

      setSelectedToppings((prev: Topping[]) => [...prev, topping]);
    });
  };

  const handleAddToCart = (product: Product) => {
    console.log("product", product);
    const itemToAdd: CartItem = {
      _id: product._id,
      name: product.name,
      image: product.image,
      priceConfiguration: product.priceConfiguration,
      chosenConfiguration: {
        priceConfiguration: chosenConfig!,
        selectedToppings: selectedToppings,
      },
      qty: 1,
    };
    dispatch(addToCart(itemToAdd));
    setSelectedToppings([]);
    setDialogOpen(false);
    toast.info("added Item into the cart");
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 w-52 cursor-pointer">
          Choose
        </DialogTrigger>

        <DialogContent className="max-w-[900px]! h-[600px] p-0 ">
          <DialogTitle className="h-[50px] text-lg font-bold p-4 border-b">
            Product Details
          </DialogTitle>
          <div className="flex  overflow-y-auto">
            <div className="w-1/3 bg-white rounded p-8 flex items-center justify-center sticky top-0">
              <Image
                src={product?.image}
                width={300}
                height={300}
                alt={product?.name}
              />
            </div>
            <div className="w-2/3 p-8">
              <h3 className="text-xl font-bold">{product?.name}</h3>
              <p className="mt-1">{product?.description}</p>
              {Object.entries(product.category.priceConfiguration).map(
                ([key, value]) => {
                  return (
                    <div key={key}>
                      <h4 className="mt-6">Choose the {key}</h4>
                      <RadioGroup
                        defaultValue={value.availableOptions[0]}
                        onValueChange={(data) => {
                          handleRadioChange(key, data);
                        }}
                        className="grid grid-cols-3 gap-4 mt-2"
                      >
                        {value.availableOptions.map((option) => {
                          return (
                            <div key={option}>
                              <RadioGroupItem
                                value={option}
                                id={option}
                                className="peer sr-only"
                                aria-label={option}
                              />
                              <Label
                                htmlFor={option}
                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                {option}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </div>
                  );
                }
              )}
              {(product.category.name === CATEGORIES.PIZZA ||
                product.category.name === CATEGORIES.VEG ||
                product.category.name === CATEGORIES.NON_VEG) && (
                <Suspense fallback={"Toppings loading..."}>
                  <ToppingList
                    selectedToppings={selectedToppings}
                    handleCheckBoxCheck={handleCheckBoxCheck}
                  />
                </Suspense>
              )}
              <div className="flex items-center justify-between py-3 ">
                <span className="font-bold">₹{totalPrice}</span>

                <Button
                  className={alreadyHasInCart ? "bg-gray-700" : "bg-primary"}
                  disabled={alreadyHasInCart}
                  onClick={() => handleAddToCart(product)}
                >
                  {/* <ShoppingCart size={20} /> */}
                  <span className="ml-2">Add to cart</span>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductModal;
