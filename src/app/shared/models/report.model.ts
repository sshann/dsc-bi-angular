import {TransactionData} from './transaction-data.model';
import {ProductData} from './product-data.model';
import {User} from './User.model';
import {EmployeeData} from './employee-data.model';

export class CompanyReport {
  graph: {
    transactions: {
      valueByDay: Graph[],
      amountByDay: Graph[],
    },
    employees: {
      teamsByDay: Graph[],
      employeesByDay: Graph[],
      salaryByDay: Graph[],
      thisYearSalaryByDepartment: Graph[],
    },
    products: {
      stockByDay: Graph[],
      valueByDay: Graph[],
      stockByCategory: Graph[],
      valueByCategory: Graph[],
    },
  };
  data: {
    transactions: TransactionData[],
    employees: EmployeeData[],
    products: ProductData[],
    users: User[],
  };
  summary: {
    transactions: {
      countSell: number,
      countBuy: number,
      valueSell: number,
      valueBuy: number,
    },
    employees: {
      departments: number,
      amount: number
    },
    products: {
      amount: number,
    },
    users: {
      // owners: number,
      // managers: number,
      amount: number,
    },
  };
}

export class Graph {
  name: string;
  series: any[];
}
