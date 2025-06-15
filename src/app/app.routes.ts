import { provideRouter, Routes } from '@angular/router';
import { ProjectList } from './features/projects/project-list/project-list';

export const routes: Routes = [
  { path: 'projects', component: ProjectList },
  { path: '', redirectTo: 'projects', pathMatch: 'full' }
];

export const appConfig = [
  provideRouter(routes)
];
