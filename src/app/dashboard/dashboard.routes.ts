import { Routes } from '@angular/router';
import { IncomeExpenseComponent } from '../income-expense/income-expense.component';
import { DetailComponent } from '../income-expense/detail/detail.component';
import { StatisticComponent } from '../income-expense/statistic/statistic.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticComponent },
  { path: 'income-expenses', component: IncomeExpenseComponent },
  { path: 'detail', component: DetailComponent },
];
