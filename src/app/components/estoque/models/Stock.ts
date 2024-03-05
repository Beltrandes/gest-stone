import { StockEntry } from "./StockEntry";
import { StockItem } from "./StockItem";
import { StockOut } from "./StockOut";

export interface Stock {
  id: string;
  name: string;
  stockItems: StockItem[];
  stockEntries: StockEntry[];
  stockOuts: StockOut[];
}
