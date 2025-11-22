import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PelucasPageComponent } from './page2/pelucas';
import { LoginPageComponent } from './login/login';
import { PanelVendedorComponent } from './vendedor/panel-vendedo';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pelucas', component: PelucasPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'vendedor', component: PanelVendedorComponent }, // 👈 súbela
  { path: '**', redirectTo: '', pathMatch: 'full' },        // 👈 siempre al final
];
