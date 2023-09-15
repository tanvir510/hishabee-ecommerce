export const apiEndpoints = Object.freeze({
  PRODUCT: {
    GET_ALL: `products`,
    GET_PRODUCT: (productId: number | string) => `products/${productId}`,
  },
});
