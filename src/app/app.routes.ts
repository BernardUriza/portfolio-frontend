import { ProjectList } from './features/projects/project-list/project-list';

export const routes = [
  { path: 'projects', component: ProjectList },
  { path: '', redirectTo: 'projects', pathMatch: 'full' }
];
