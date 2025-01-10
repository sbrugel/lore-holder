import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { WorldListComponent } from './world-list/world-list.component';
import { WorldViewerComponent } from './world-viewer/world-viewer.component';
import { CharacterViewerComponent } from './character-viewer/character-viewer.component';
import { PlaceViewerComponent } from './place-viewer/place-viewer.component';
import { StoryViewerComponent } from './story-viewer/story-viewer.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        title: 'Home',
    },
    {
        path: 'worlds',
        component: WorldListComponent,
        title: 'Worlds List',
    },
    {
        path: 'world/:id',
        component: WorldViewerComponent,
        title: 'World Viewer',
    },
    {
        path: 'character/:id',
        component: CharacterViewerComponent,
        title: 'Character Viewer',
    },
    {
        path: 'place/:id',
        component: PlaceViewerComponent,
        title: 'Place Viewer',
    },
    {
        path: 'story/:id',
        component: StoryViewerComponent,
        title: 'Story Viewer',
    },
];
