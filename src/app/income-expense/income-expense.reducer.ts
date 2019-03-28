import * as fromIncomeExpense from './income-expense.actions';
import { IncomeExpense } from './income-expense.model';
import { AppState } from '../app.reducer';

export interface State {
  items: IncomeExpense[];
}

export interface AppState extends AppState {
  incomeExpense: State;
}

const initState: State = {
  items: []
};

export function incomeExpenseReducer(state = initState, action: fromIncomeExpense.actions): State {
  switch (action.type) {
    case fromIncomeExpense.SET_ITEMS:
      return {
        ...state,
        items: [
          ...action.items.map(item => {
            return {
              ...item
            };
          })
        ]
      };
    case fromIncomeExpense.UNSET_ITEMS:
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
}
