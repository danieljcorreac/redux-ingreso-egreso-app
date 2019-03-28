export class IncomeExpense {
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  uid?: string;

  constructor(incomeExpense: DBIncomeExpense) {
    this.description = incomeExpense && incomeExpense.description || null;
    this.amount = incomeExpense && incomeExpense.amount || null;
    this.type = incomeExpense && incomeExpense.type || null;
    this.uid =  incomeExpense && incomeExpense.uid || null;
  }
}

export interface DBIncomeExpense {
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  uid: string;
}
