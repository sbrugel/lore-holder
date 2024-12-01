import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { WorldListComponent } from './world-list/world-list.component';
import { WorldViewerComponent } from './world-viewer/world-viewer.component';

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
    {
        path: 'world/:id',
        component: WorldViewerComponent,
        title: 'World viewer',
    }
];
