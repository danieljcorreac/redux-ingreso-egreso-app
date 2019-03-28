import * as fromIncomeExpense from './income-expense.actions';
import { IncomeExpense } from './income-expense.model';

export interface State {
  items: IncomeExpense[];
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
