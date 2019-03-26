import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class User {
  public name: string;
  public email: string;
  public liability: string;
  public uid: string;

  constructor(user: FirebaseUser) {
    this.name = user && user.name || null;
    this.email = user && user.email || null;
    this.liability = user && user.liability || null;
    this.uid =  user && user.uid || null;
  }
}

export interface FirebaseUser {
  name: string;
  email: string;
  liability: string;
  uid: string;
}
