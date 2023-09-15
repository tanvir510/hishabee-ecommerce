"use client";

// Library Import
import { useDispatch } from "react-redux";

// File Import
import { useAppSelector } from "@/redux/store";
import {
  addToCart,
  decreaseFromCart,
  deleteFromCart,
} from "@/redux/features/productSlice";

const Carts: React.FC = () => {
  const carts = useAppSelector((state) => state.productReducer.value.carts);
  const dispatch = useDispatch();

  const grandTotal = carts.reduce((total, cartItem) => {
    const itemTotalPrice =
      typeof cartItem.totalPrice === "string"
        ? parseFloat(cartItem.totalPrice)
        : cartItem.totalPrice;

    if (typeof itemTotalPrice === "number" && !isNaN(itemTotalPrice)) {
      return total + itemTotalPrice;
    }

    return total;
  }, 0) as number;

  return (
    <div className="page_wrapper">
      {/* Main Block */}
      <main className="py-10">
        <div className="container mx-auto mt-8">
          <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

          {carts?.length ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {carts?.map((product, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{product?.title}</td>
                    <td className="px-4 py-2">${product?.price}</td>
                    {/* <td className="px-4 py-2">{product?.quantity}</td> */}
                    <td className="px-4 py-2">
                      <button
                        onClick={() => dispatch(decreaseFromCart(product?.id))}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span className="px-2">{product?.quantity}</span>
                      <button
                        onClick={() => dispatch(addToCart(product?.id))}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </td>
                    <td className="px-4 py-2">${product?.totalPrice}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => dispatch(deleteFromCart(product?.id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2 font-semibold">
                    Total: ${grandTotal?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2"></td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="empty_text">Currently you have no product</div>
          )}
          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              Checkout
            </button>
          </div>
        </div>
      </main>
      {/* {loading && <Loading />} */}
    </div>
  );
};

export default Carts;
