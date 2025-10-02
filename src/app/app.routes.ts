import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';
import { CoursesComponent } from './pages/courses.component';
import { CourseDetailComponent } from './pages/course-detail.component';
import { FavoritesComponent } from './pages/favorites.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/courses' }
];