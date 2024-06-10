import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'specialists',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/specialists/specialists.module').then(
        (m) => m.SpecialistsModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];
