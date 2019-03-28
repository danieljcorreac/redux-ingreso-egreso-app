import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IncomeExpense } from '../income-expense.model';
import { Subscription } from 'rxjs';
import { IncomeExpenseService } from '../income-expense.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  items: IncomeExpense[];
  subscription: Subscription;

  constructor(private incomeExpenseService: IncomeExpenseService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('incomeExpense').subscribe(incomeExpense => {
      this.items = incomeExpense.items;
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  deleteItem(incomeExpense: IncomeExpense) {
    this.incomeExpenseService.deleteIncomeExpense(incomeExpense);
  }
}
