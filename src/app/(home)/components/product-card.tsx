import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { Suspense } from "react";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
// import ProductModal from './product-modal';
import { getFromPrice } from "@/lib/utils";
import ProductModal from "./product-model";

// export type Product = {
//     id: string;
//     name: string;
//     description: string;
//     image: string;
//     price: number;
// };
type PropTypes = { product: Product };

const ProductCard = ({ product }: PropTypes) => {
  return (
    <Card className="border-none rounded-xl !max-h-[700px] !max-w-[500px]">
      <CardHeader className="flex items-center justify-center">
        <Image alt="pizza-image" width={150} height={150} src={product.image} />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2" style={{ height: "50px" }}>
          {product.description.slice(0, 50)}...
        </p>
        <div className="flex items-center justify-between mt-4 w-[350px]">
          <p>
            <span>From </span>
            <span className="font-bold">₹{getFromPrice(product)}</span>
          </p>

          <ProductModal product={product} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
