"use client";
import ProductList from "@/app/(home)/components/product-list";
import { Button } from "@/components/ui/button";
import { FetchCategories } from "@/services/category.service";
import Image from "next/image";
import { use } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { restaurantId: string };
}) {
  const { data: categoriesData } = FetchCategories();

  return (
    <>
      <section className="bg-white">
        <div className="container flex items-center justify-between py-24">
          <div className="mx-5">
            <h1 className="text-5xl font-black font-sans">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image
              alt="pizza-main"
              src={"/images/pizza-main.png"}
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
      {/* <Suspense fallback={"Loading...."}> */}
      <ProductList searchParams={searchParams} />
      {/* </Suspense> */}
    </>
  );
}
