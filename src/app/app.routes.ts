import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CalculatorPage } from './pages/calculator-page/calculator-page';
import { Todo } from './pages/todo/todo';
import { Reports } from './pages/reports/reports';
import { Add } from './pages/add/add';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomePage
    },
    {
        path: 'calculator',
        component: CalculatorPage
    },
    {
        path: 'todo',
        component: Todo
    },
    {
        path: 'reports',
        component: Reports
    },
    {
        path: 'add',
        component: Add
    },
    {
        path: 'update/:id',
        component: Add
    }
];
