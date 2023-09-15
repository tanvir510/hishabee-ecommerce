import { ProductType } from "@/types";
import { isExistItem } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: ProductState;
};

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

type ProductState = {
  products: ProductType[];
  carts: ProductType[];
};

const initialState = {
  value: {
    products: [],
    carts: [] || undefined,
  } as ProductState,
} as InitialState;

export const product = createSlice({
  name: "Product",
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<ProductType[]>) => {
      return {
        value: {
          products: action.payload,
          carts: [...state.value.carts],
        },
      };
    },

    addToCart: (state, action: PayloadAction<number>) => {
      const carts = [...state.value.carts];

      let product = state.value.products.find(
        (product: ProductType) => product.id === action.payload
      );

      if (!product) return state;

      let updatedCarts: ProductType[] = [];

      if (isExistItem(carts, product.id)) {
        const findIndex = carts.findIndex((item) => item?.id === product?.id);

        if (findIndex !== -1) {
          console.log(carts[findIndex].totalPrice);

          updatedCarts = carts.map((item, index) =>
            index === findIndex
              ? {
                  ...item,
                  quantity: item?.quantity ? item?.quantity + 1 : 0,
                  totalPrice: item?.totalPrice
                    ? item?.totalPrice + item?.price
                    : 0,
                }
              : item
          );
        }
      } else {
        updatedCarts = [
          ...state.value.carts,
          {
            ...product,
            quantity: 1,
            totalPrice: product?.price,
          },
        ];
      }

      return {
        value: {
          products: [...state.value.products],
          carts: updatedCarts,
        },
      };
    },

    decreaseFromCart: (state, action: PayloadAction<number>) => {
      const carts = [...state.value.carts];

      const findIndex = carts.findIndex((item) => item?.id === action.payload);

      if (findIndex !== -1) {
        const itemToRemove = carts[findIndex];

        if (itemToRemove?.quantity === 1) {
          // If the item quantity is 1, remove it from the cart entirely
          carts.splice(findIndex, 1);
        } else if (itemToRemove?.quantity) {
          // Ensure both totalPrice and price are numbers before subtraction
          const totalPrice =
            typeof itemToRemove.totalPrice === "number"
              ? itemToRemove.totalPrice
              : 0;
          const price =
            typeof itemToRemove.price === "number" ? itemToRemove.price : 0;

          // Subtract price and round totalPrice to two decimal places
          const newTotalPrice = +(totalPrice - price).toFixed(2);

          carts[findIndex] = {
            ...itemToRemove,
            quantity: itemToRemove.quantity - 1,
            totalPrice: newTotalPrice,
          };
        }
      }

      return {
        value: {
          products: [...state.value.products],
          carts: carts,
        },
      };
    },

    deleteFromCart: (state, action: PayloadAction<number>) => {
      const carts = [...state.value.carts];

      const filterCarts = carts?.filter(
        (product) => product?.id !== action.payload
      );

      return {
        value: {
          products: [...state.value.products],
          carts: filterCarts,
        },
      };
    },
  },
});

export const { getProducts, addToCart, decreaseFromCart, deleteFromCart } =
  product.actions;

export default product.reducer;
