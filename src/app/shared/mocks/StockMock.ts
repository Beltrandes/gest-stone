import { Employee } from "../../components/employee/models/Employee";
import { Stock } from "../../components/estoque/models/Stock";
import { StockEntry } from "../../components/estoque/models/StockEntry";
import { StockItem } from "../../components/estoque/models/StockItem";
import { StockOut } from "../../components/estoque/models/StockOut";

var stocks: Stock[] = [
  {id: '1', name: 'Produção', stockEntries: [], stockOuts: [], stockItems: []},
  {id: '2', name: 'Instalação', stockEntries: [], stockOuts: [], stockItems: []},
]

const stockItems: StockItem[] = [
  {id: '1', name: 'Disco de Maquita', details: 'Porcelanato', minQuantity: 2, quantity: 9, stock: stocks[0]},
  {id: '2', name: 'Massa Plástica', details: 'Branca', minQuantity: 5, quantity: 0, stock: stocks[0]},
  {id: '3', name: 'Massa Plástica', details: 'Preta', minQuantity: 5, quantity: 9, stock: stocks[0]},
  {id: '4', name: 'PU 40', details: 'Branco', minQuantity: 4, quantity: 6, stock: stocks[1]},
  {id: '5', name: 'Serra Copo', details: '35mm', minQuantity: 2, quantity: 3, stock: stocks[1]},
  {id: '6', name: 'Fero T', details: '60cm', minQuantity: 4, quantity: 9, stock: stocks[1]},
]

const stockEntries: StockEntry[] = [
  {id: '1', stock: stocks[0], stockItem: stockItems[1], previousQuantity: stockItems[1].quantity, addedQuantity: 3, supplier: 'Melo', movementDate: new Date()},
  {id: '2', stock: stocks[1], stockItem: stockItems[0], previousQuantity: stockItems[0].quantity, addedQuantity: 5, supplier: 'Gambia', movementDate: new Date()}
]

const employees: Employee[] = [
  {id: '1', name: 'Adailton Damasceno', document: '232342132', admissionDate: new Date(), role: 'Produção'},
  {id: '2', name: 'Beltrandes Marques', document: '390318838', admissionDate: new Date(), role: 'Instalação'},
]

const stockOuts: StockOut[] = [
  {id: '1', stock: stocks[0], stockItem: stockItems[2], previousQuantity: stockItems[2].quantity, withdrawnQuantity: 3, employee: employees[0], movementDate: new Date(2024, 2, 14)},
  {id: '2', stock: stocks[1], stockItem: stockItems[4], previousQuantity: stockItems[4].quantity, withdrawnQuantity: 5, employee: employees[1], movementDate: new Date(2024, 2, 15)},
]
stocks[0].stockItems.push(stockItems[0])
stocks[0].stockItems.push(stockItems[1])
stocks[0].stockItems.push(stockItems[2])
stocks[1].stockItems.push(stockItems[3])
stocks[1].stockItems.push(stockItems[4])
stocks[1].stockItems.push(stockItems[5])

stocks[0].stockEntries.push(stockEntries[0])
stocks[1].stockEntries.push(stockEntries[1])
stocks[0].stockOuts.push(stockOuts[0])
stocks[1].stockOuts.push(stockOuts[1])

export {
  stocks,
  stockItems,
  stockEntries,
  employees,
  stockOuts
};
