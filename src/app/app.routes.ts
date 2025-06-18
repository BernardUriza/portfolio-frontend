import { provideRouter, Routes } from '@angular/router';
import { ProjectList } from './features/projects/project-list/project-list';
import { SkillList } from './features/skills/skill-list/skill-list';
import { AdminComponent } from './features/admin/admin.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'projects', component: ProjectList },
  { path: 'skills', component: SkillList },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] }
];

export const appConfig = [
  provideRouter(routes)
];
