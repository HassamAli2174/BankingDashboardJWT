// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/guards/auth-guard';


// const routes: Routes = [
//     { path: 'auth', loadChildren: () => import('./features/auth/auth-module').then(m => m.AUTH_ROUTES) },
//     { path: '', loadChildren: () => import('./features/dashboard/dashboard/dashboard').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
//     { path: '**', redirectTo: '' }
// ];


// @NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
// export class AppRoutingModule { }
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth-guard';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
];

