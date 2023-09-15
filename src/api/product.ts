// File Import

import http from "@/plugins/axios";
import { apiEndpoints } from "./apiEndpoints";

export class Products {
  static getProducts(payload: any) {
    return http.get(apiEndpoints.PRODUCT.GET_ALL, { params: payload });
  }

  static getProduct(productId: number | string) {
    return http.get(apiEndpoints.PRODUCT.GET_PRODUCT(productId));
  }
}
