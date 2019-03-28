import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIncomeExpense from './income-expense/income-expense.reducer';

export interface AppState {
  ui: fromUI.State;
  auth: fromAuth.State;
  incomeExpense: fromIncomeExpense.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  incomeExpense: fromIncomeExpense.incomeExpenseReducer
};
