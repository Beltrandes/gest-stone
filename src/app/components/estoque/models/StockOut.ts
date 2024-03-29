import { Employee } from "../../employee/models/Employee";
import { Stock } from "./Stock";
import { StockItem } from "./StockItem";

export interface StockOut {
  id: string;
  stock: Stock;
  stockItem: StockItem;
  previousQuantity: number;
  withdrawnQuantity: number;
  movementDate: Date;
  employee: Employee
}
