import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromIncomeExpense from '../income-expense.reducer';
import { IncomeExpense } from '../income-expense.model';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit, OnDestroy {

  incomes: number;
  expenses: number;

  countIncomes: number;
  countExpenses: number;

  doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  doughnutChartColors: Color[] = [{
    backgroundColor: ['#28a745', '#dc3545']
  }];
  doughnutChartData: number[] = [];

  subscription: Subscription;

  constructor(private store: Store<fromIncomeExpense.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('incomeExpense').subscribe(incomeExpense => {
      this.calculateIncomesExpenses(incomeExpense.items);
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  calculateIncomesExpenses(items: IncomeExpense[]) {
    this.incomes = 0;
    this.expenses = 0;

    this.countIncomes = 0;
    this.countExpenses = 0;

    items.forEach(item => {
      if (item.type === 'Income') {
        this.countIncomes++;
        this.incomes += item.amount;
      } else {
        this.countExpenses++;
        this.expenses += item.amount;
      }
    });

    this.doughnutChartData = [this.incomes, this.expenses];
  }
}
