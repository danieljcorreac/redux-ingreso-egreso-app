import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { IncomeExpenseService } from '../../income-expense/income-expense.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  userName: string;
  liability: string;
  subscription: Subscription;

  constructor(private authService: AuthService,
              private incomeExpenseService: IncomeExpenseService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this
                          .store
                          .select('auth')
                          .pipe(
                            filter(auth => auth.isAuthenticated)
                          )
                          .subscribe(auth => {
      this.userName = auth.user.name;
      this.liability = auth.user.liability;
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.incomeExpenseService.unsubscribes();
    this.authService.logout();
  }
}
