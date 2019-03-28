import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as fromIncomeExpense from './income-expense.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import Swal from 'sweetalert2';
import { IncomeExpense, DBIncomeExpense } from './income-expense.model';
import { AuthService } from '../auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './income-expense.actions';
import { TypeIncomeExpensePipe } from './type-income-expense.pipe';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  private authSubscription: Subscription;
  private incomeExpenseSubscription: Subscription;

  constructor(private afDB: AngularFirestore,
              private authService: AuthService,
              private store: Store<fromIncomeExpense.AppState>) { }

    initIncomeExpenseListener() {
      this.authSubscription = this
                                .store
                                .select('auth')
                                .pipe(
                                  filter(auth => auth.isAuthenticated)
                                )
                                .subscribe(auth => this.initIncomeExpenseDBListener(auth.user.uid));
    }

    private initIncomeExpenseDBListener(uid: string) {
      this.incomeExpenseSubscription = this
                                        .afDB
                                        .collection(`${uid}/income-expense/items`)
                                        .snapshotChanges()
                                        .pipe(
                                          map((fbItems) => {
                                            return fbItems.map(fbItem => {
                                              return {
                                                ...fbItem.payload.doc.data(),
                                                uid: fbItem.payload.doc.id
                                              };
                                            });
                                          })
                                        )
                                        .subscribe((items: DBIncomeExpense[]) => {
                                          const newItems = items.map(fbItem => {
                                              return new IncomeExpense({...fbItem });
                                          });
                                          this.store.dispatch(new SetItemsAction(newItems));
                                        });
    }

    unsubscribes() {
      this.store.dispatch(new UnsetItemsAction());
      if (this.authSubscription && !this.authSubscription.closed) {
        this.authSubscription.unsubscribe();
      }
      if (this.incomeExpenseSubscription && !this.incomeExpenseSubscription.closed) {
        this.incomeExpenseSubscription.unsubscribe();
      }
    }

    createIncomeExpense(incomeExpense: IncomeExpense): Observable<void> {
      return new Observable((observer) => {
        this.store.dispatch(new ActivateLoadingAction());
        const user = this.authService.getUser();
        const dbIncomeExpense = {...incomeExpense};
        delete dbIncomeExpense.uid;
        this
          .afDB
          .doc(`${user.uid}/income-expense`)
          .collection('items')
          .add(dbIncomeExpense)
          .then(() => {
              Swal.fire({
                title: `Creado correctamente el ${this.transformType(incomeExpense.type)}`,
                text: incomeExpense.description,
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.store.dispatch(new DeactivateLoadingAction());
              observer.next();
              observer.complete();
          })
          .catch(error => {
            Swal.fire({
              title:  `Error al crear el ${this.transformType(incomeExpense.type)}`,
              text: error.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
            this.store.dispatch(new DeactivateLoadingAction());
            observer.error();
          });
      });
    }

    deleteIncomeExpense(incomeExpense: IncomeExpense) {
      const user = this.authService.getUser();
      this
        .afDB
        .doc(`${user.uid}/income-expense/items/${incomeExpense.uid}`)
        .delete()
        .then(() => {
          Swal.fire({
            title: `${this.transformType(incomeExpense.type)} eliminado correctamente`,
            text: incomeExpense.description,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        })
        .catch(error => {
          Swal.fire({
            title:  `Error al eliminar el ${this.transformType(incomeExpense.type)}`,
            text: error.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
    }

    private transformType(type: 'Income' | 'Expense') {
      const pipe = new TypeIncomeExpensePipe();
      return pipe.transform(type);
    }
}
