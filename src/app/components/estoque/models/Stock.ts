import { StockEntry } from "./StockEntry";
import { StockItem } from "./StockItem";
import { StockOut } from "./StockOut";

export interface Stock {
  id: string;
  name: string;
  stockEntries: StockEntry[]
  stockOuts: StockOut[]
  stockItems: StockItem[]
}
