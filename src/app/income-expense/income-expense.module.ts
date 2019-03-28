// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// NGRX
import { StoreModule } from '@ngrx/store';

// Charts
import { ChartsModule } from 'ng2-charts';

// Apps Modules
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

// Components
import { IncomeExpenseComponent } from './income-expense.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DetailComponent } from './detail/detail.component';
import { OrderIncomeExpensePipe } from './order-income-expense.pipe';
import { TypeIncomeExpensePipe } from './type-income-expense.pipe';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { incomeExpenseReducer } from './income-expense.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpenseComponent,
    StatisticComponent,
    DetailComponent,
    OrderIncomeExpensePipe,
    TypeIncomeExpensePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('incomeExpense', incomeExpenseReducer),
  ]
})
export class IncomeExpenseModule { }
