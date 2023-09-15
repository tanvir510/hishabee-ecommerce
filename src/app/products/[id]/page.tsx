"use client";

// Library Import
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";

// File Import
import { Products } from "@/api";
import { Loading } from "@/app/component";
import { addToCart } from "@/redux/features/productSlice";

export default function ProductDetailPage() {
  const [product, setProduct]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useParams();
  const dispatch = useDispatch();
  const productId = navigation?.id;

  useEffect(() => {
    if (productId) fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await Products.getProduct(Number(productId));
      if (response?.status === 200) {
        setProduct(response?.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (!product) {
    // Handle the case where 'id' query parameter is missing
    return (
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <Image
              src={product?.image || ""}
              alt={product?.title || ""}
              width={200}
              height={250}
              style={{ margin: "0 auto" }}
              className="rounded-lg"
            />
          </div>
          <div className="lg:w-1/2 lg:ml-6">
            <h1 className="text-3xl font-semibold">{product?.title || ""}</h1>
            <p className="text-gray-600">{product?.description || ""}</p>
            <p className="text-xl mt-4 font-semibold">
              ${product?.price || ""}
            </p>
            <button
              onClick={() => dispatch(addToCart(product?.id))}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </div>
  );
}
