import { Action } from '@ngrx/store';
import { IncomeExpense } from './income-expense.model';

export const SET_ITEMS = '[Income-Expense] Set Items';
export const UNSET_ITEMS = '[Income-Expense] Unset Items';

export class SetItemsAction implements Action {
  readonly type = SET_ITEMS;

  constructor(public items: IncomeExpense[]) { }
}

export class UnsetItemsAction implements Action {
  readonly type = UNSET_ITEMS;

  constructor() { }
}

export type actions = SetItemsAction |
                      UnsetItemsAction;
