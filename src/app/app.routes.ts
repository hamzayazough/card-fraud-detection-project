import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ValidationComponent } from './pages/validation/validation.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'validation', component: ValidationComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
  ];