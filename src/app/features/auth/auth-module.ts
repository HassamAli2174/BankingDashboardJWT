import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Register } from './register/register';

export const AUTH_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: Register },
];
