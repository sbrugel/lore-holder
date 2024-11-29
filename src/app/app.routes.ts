import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { WorldListComponent } from './world-list/world-list.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        title: 'Home page',
    },
    {
        path: 'worlds',
        component: WorldListComponent,
        title: 'Worlds list',
    },
];
