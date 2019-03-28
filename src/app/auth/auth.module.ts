// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Firebase
import { AngularFireAuthModule } from '@angular/fire/auth';

// Apps Modules
import { AuthRoutingModule } from './auth-routing.module';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AngularFireAuthModule,
    AuthRoutingModule,
  ],
  providers: [],
})
export class AuthModule { }
