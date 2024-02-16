import { Stock } from "./Stock";
import { StockItem } from "./StockItem";

export interface StockEntry {
  id: string;
  stock: Stock;
  stockItem: StockItem;
  previousQuantity: number;
  addedQuantity: number;
  supplier: string;
}
