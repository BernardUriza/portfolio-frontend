import { provideRouter, Routes } from '@angular/router';
import { ProjectList } from './features/projects/project-list/project-list';
import { SkillList } from './features/skills/skill-list/skill-list';
import { AdminComponent } from './features/admin/admin.component';
import { authGuard } from './core/auth/auth.guard';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: 'projects', component: ProjectList },
  { path: 'skills', component: SkillList },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'experience',
    loadChildren: () => import('./features/experience/experience.routes').then(m => m.routes)
  },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] }
];

export const appConfig = [
  provideRouter(routes)
];
