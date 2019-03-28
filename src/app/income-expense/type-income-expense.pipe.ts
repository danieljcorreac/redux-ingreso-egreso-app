import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeIncomeExpense'
})
export class TypeIncomeExpensePipe implements PipeTransform {
  transform(type: 'Income' | 'Expense'): string {
    return type === 'Income' ? 'Ingreso' : 'Egreso';
  }
}
