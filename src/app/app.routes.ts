import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EstoqueComponent } from './components/estoque/estoque.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'estoque',
    component: EstoqueComponent,
    pathMatch: 'full',
  }
];
