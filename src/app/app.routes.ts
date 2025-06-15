import { provideRouter, Routes } from '@angular/router';
import { ProjectList } from './features/projects/project-list/project-list';
import { SkillList } from './features/skills/skill-list/skill-list';

export const routes: Routes = [
  { path: 'projects', component: ProjectList },
  { path: 'skills', component: SkillList },
  { path: '', redirectTo: 'projects', pathMatch: 'full' }
];

export const appConfig = [
  provideRouter(routes)
];
