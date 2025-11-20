import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PelucasPageComponent } from './page2/pelucas';
export const routes: Routes = [
  { path: '', component: Home    },
  { path:'pelucas',component:PelucasPageComponent},
  {path: '**', redirectTo: ''},
];
