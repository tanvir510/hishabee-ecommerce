// File Import
import { apiEndpoints } from "./apiEndpoints";
import Axios from "axios";

export class Products {
  static getProducts(payload: any) {
    return Axios.get(apiEndpoints.PRODUCT.GET_ALL, { params: payload });
  }
}
