"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { use } from "react";
import ProductCard from "./product-card";
import { Category, Product } from "@/lib/types";
import { FetchProductsWithPagination } from "@/services/product.service";
import { FetchCategories } from "@/services/category.service";

const ProductList = ({ restaurantId }: { restaurantId: string }) => {
  // todo: do concurrent requests -> Promise.all()
  //   const categoryResponse = await fetch(
  //     `${process.env.BACKEND_URL}/api/catalog/categories`,
  //     {
  //       next: {
  //         revalidate: 3600, // 1 hour
  //       },
  //     }
  //   );

  //   if (!categoryResponse.ok) {
  //     throw new Error("Failed to fetch categories");
  //   }

  //   const categories: Category[] = await categoryResponse.json();

  // todo: add pagination
  //   const productsResponse = await fetch(
  //     `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&limit=100&tenantId=${searchParams.restaurantId}`,
  //     {
  //       next: {
  //         revalidate: 3600, // 1 hour
  //       },
  //     }
  //   );

  //   const products: { data: Product[] } = await productsResponse.json();

  const { data: productsData, isLoading: productsLoading } =
    FetchProductsWithPagination(restaurantId);

  const { data: categoriesData, isLoading: categoriesLoading } =
    FetchCategories();

  console.log("categoriesData", categoriesData?.data?.categoryDto);
  console.log("productsData", productsData?.data?.productDto);

  return (
    <>
      {productsLoading || categoriesLoading ? (
        // add skeleton loading components
        <h1>Loading...</h1>
      ) : (
        <section className="m-5">
          {/* <div className="container py-12">
        <Tabs defaultValue={categoriesData?.data?.categoryDto[0]?._id}>
          <TabsList>
            {categoriesData?.data?.categoryDto?.map((category: Category) => {
              return (
                <TabsTrigger
                  key={category._id}
                  value={category._id}
                  className="text-md"
                >
                  {category.name}
                </TabsTrigger>
              );
            })}
            <TabsTrigger value="beverages" className="text-md">
              Beverages
            </TabsTrigger>
          </TabsList>
          {categoriesData?.data?.categoryDto?.map((category: Category) => {
            return (
              <TabsContent key={category._id} value={category._id}>
                <div className="grid grid-cols-4 gap-6 mt-6">
                  {productsData?.data?.productDto
                    ?.filter(
                      (product: Product) =>
                        product.category._id === category._id
                    )
                    .map((product: Product) => (
                      <ProductCard product={product} key={product._id} />
                    ))}
                </div>
              </TabsContent>
            );
          })}

          <TabsContent value="beverages">
            <div className="grid grid-cols-4 gap-6 mt-6">
              {productsData?.data?.productDto?.map((product: Product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div> */}
          <div className="container py-12">
            <Tabs
              defaultValue={categoriesData?.data?.categoryDto[0]?._id}
              defaultChecked={categoriesData?.data?.categoryDto[0]?._id}
            >
              <TabsList>
                {categoriesData?.data?.categoryDto?.map(
                  (category: Category) => {
                    return (
                      <TabsTrigger
                        key={category._id}
                        value={category._id}
                        className="text-md cursor-pointer"
                      >
                        {category.name}
                      </TabsTrigger>
                    );
                  }
                )}
              </TabsList>
              {categoriesData?.data?.categoryDto?.map((category: Category) => {
                return (
                  <TabsContent key={category._id} value={category._id}>
                    <div className="flex flex-wrap gap-4 mt-6">
                      {productsData?.data?.productDto
                        ?.filter(
                          (product: Product) =>
                            product.category._id === category._id
                        )
                        .map((product: Product) => {
                          // return <h1 key={product?._id}>{product?.name}</h1>;
                          return (
                            <ProductCard product={product} key={product._id} />
                          );
                        })}
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductList;
