import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IncomeExpense } from './income-expense.model';
import { IncomeExpenseService } from './income-expense.service';
import { Store } from '@ngrx/store';
import * as fromIncomeExpense from './income-expense.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css']
})
export class IncomeExpenseComponent implements OnInit, OnDestroy {

  form: FormGroup;
  type: 'Income' | 'Expense' = 'Income';
  isLoading: boolean;
  subscription: Subscription;

  constructor(private incomeExpenseService: IncomeExpenseService,
              private store: Store<fromIncomeExpense.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });

    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    const incomeExpense = new IncomeExpense({
      ...this.form.value,
      type: this.type
    });

    this
      .incomeExpenseService
      .createIncomeExpense(incomeExpense)
      .subscribe(() => {
        this.form.reset({
          amount: 0
        });
    });
  }
}
