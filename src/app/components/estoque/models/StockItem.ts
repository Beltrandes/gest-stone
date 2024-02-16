import { Stock } from "./Stock";

export interface StockItem {
  id: string;
  name: string;
  details: string;
  stock: Stock
  quantity: number
  minQuantity: number
}
