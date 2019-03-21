import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth,
              public afDB: AngularFirestore,
              public router: Router) { }

  initAutListener() {
    this.afAuth.authState.subscribe(user => {
      console.log('authState', user);
    });
  }

  createUser(name: string, email: string, password: string) {
    this
      .afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(fbUser => {

        const user: User = {
          name: name,
          email: fbUser.user.email,
          uid: fbUser.user.uid
        };

        this
          .afDB
          .doc(`${user.uid}/user`)
          .set(user).then(() => {
            this.router.navigate(['/']);
          })
          .catch(error => {
            Swal.fire({
              title: 'Error al crear el usuario',
              text: error.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
          });

      })
      .catch(error => {
        Swal.fire({
          title: 'Error al crear el usuario',
          text: error.message,
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }

  login(email: string, password: string) {
    this
      .afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal.fire({
          title: 'Error al autenticar',
          text: error.message,
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }

  logout() {
    this
      .afAuth
      .auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.router.navigate(['/login']);
      });
  }

  isAuthenticated() {
    return this.afAuth.authState.pipe(
      map(user => {
        const isAuthenticated = user !== null;
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
        return isAuthenticated;
      })
    );
  }
}
