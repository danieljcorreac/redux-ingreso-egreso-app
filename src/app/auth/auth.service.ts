import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User, DBUser } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private userSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth,
              private afDB: AngularFirestore,
              private router: Router,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {
      if (fbUser) {
        this.userSubscription = this
          .afDB
          .doc(`${fbUser.uid}/user`)
          .valueChanges()
          .subscribe((user: DBUser) => {
            const newUser = new User(user);
            this.store.dispatch(new SetUserAction(newUser));
            this.user = newUser;
          });
      } else {
        this.user = null;
        if (this.userSubscription && !this.userSubscription.closed) {
          this.userSubscription.unsubscribe();
        }
      }
    });
  }

  createUser(name: string, email: string, liability: string, password: string) {

    this.store.dispatch(new ActivateLoadingAction());

    this
      .afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(fbUser => {

        const user: User = {
          name: name,
          email: fbUser.user.email,
          liability: liability,
          uid: fbUser.user.uid
        };

        this
          .afDB
          .doc(`${user.uid}/user`)
          .set(user).then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DeactivateLoadingAction());
          })
          .catch(error => {
            Swal.fire({
              title: 'Error al crear el usuario',
              text: error.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
            this.store.dispatch(new DeactivateLoadingAction());
          });

      })
      .catch(error => {
        Swal.fire({
          title: 'Error al crear el usuario',
          text: error.message,
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.store.dispatch(new DeactivateLoadingAction());
      });
  }

  login(email: string, password: string) {

    this.store.dispatch(new ActivateLoadingAction());

    this
      .afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(fbUser => {
        this.router.navigate(['/']);
        this.store.dispatch(new DeactivateLoadingAction());
      })
      .catch(error => {
        Swal.fire({
          title: 'Error al autenticar',
          text: error.message,
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.store.dispatch(new DeactivateLoadingAction());
      });
  }

  logout() {

    this.store.dispatch(new ActivateLoadingAction());

    this
      .afAuth
      .auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
        this.store.dispatch(new SetUserAction(null));
        this.store.dispatch(new DeactivateLoadingAction());
      })
      .catch(error => {
        this.router.navigate(['/login']);
        this.store.dispatch(new SetUserAction(null));
        this.store.dispatch(new DeactivateLoadingAction());
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        const isAuthenticated = fbUser !== null;
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
        return isAuthenticated;
      })
    );
  }

  getUser(): User {
    return {...this.user};
  }
}
