import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from './income-expense.model';

@Pipe({
  name: 'orderIncomeExpense'
})
export class OrderIncomeExpensePipe implements PipeTransform {
  transform(items: IncomeExpense[]): IncomeExpense[] {
    return items.sort(a => {
      return a.type === 'Income' ? -1 : 1;
    });
  }
}
