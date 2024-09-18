import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.routes')
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'reactive',
    pathMatch: 'full'
  }
];
