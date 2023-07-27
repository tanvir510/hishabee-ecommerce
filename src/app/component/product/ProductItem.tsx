// src/components/TodoItem.tsx
import React from "react";
import Image from "next/image";
import { getTruncateString } from "@/utils";

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

interface ProductItemProps {
  product: Product;
  handleAddToCart: (id: number) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  handleAddToCart,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <div className="relative h-40 w-full mb-4">
        <Image
          src={product?.image}
          alt="Product"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h2 className="text-base font-bold min-h-[50px]">
        {getTruncateString(product?.title, 35)}
      </h2>
      <p className="text-gray-600">Price: ${product?.price}</p>
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Add to Cart
      </button>
    </div>
  );
};
