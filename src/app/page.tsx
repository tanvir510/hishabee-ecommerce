/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// Library Import
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// File Import
import { Products } from "@/api";
import { Loading, ProductItem } from "./component";
import { ProductType } from "@/types";
import { addToCart, getProducts } from "@/redux/features/productSlice";
import { useAppSelector } from "@/redux/store";

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const existingProducts = useAppSelector(
    (state) => state.productReducer.value.products
  );

  useEffect(() => {
    fetchProducts({ limit: 16 });
  }, []);

  useEffect(() => {
    setProducts(existingProducts);
  }, [existingProducts]);

  const fetchProducts = async (params?: any) => {
    try {
      setLoading(true);
      const response = await Products.getProducts(params);
      if (response.status === 200) {
        dispatch(getProducts(response.data));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="page_wrapper">
      {/* Main Block */}
      <main className="py-10">
        <div className="container relative">
          {/* Products Sort By */}
          <div className="flex items-center justify-end pb-10">
            <div className="relative w-60">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                defaultValue=""
                name="sort_by"
                onChange={(event) =>
                  fetchProducts({ sort: event.target.value })
                }
              >
                <option value="" disabled>
                  Sort By
                </option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 13.293a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 10.586V3a1 1 0 10-2 0v7.586l-2.293-2.293a1 1 0 10-1.414 1.414l4 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Lists of product */}
          {products?.length !== 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products?.map((product, index) => (
                <ProductItem
                  key={index}
                  product={product}
                  handleAddToCart={(id: number) => dispatch(addToCart(id))}
                />
              ))}
            </div>
          ) : (
            <div className="empty_text">Currently you have no product</div>
          )}

          {/* Loading Spinner */}
          {loading && <Loading />}
        </div>
      </main>
    </div>
  );
};

export default Home;
