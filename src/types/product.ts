export interface ProductType {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  quantity?: number;
  totalPrice?: number | string;
}
