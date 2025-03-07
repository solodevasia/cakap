import { Routes } from '@angular/router';
import CourseComponent from './pages/course/course.component';
import CourseDetailComponent from './pages/course/detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/course',
    pathMatch: 'full',
  },
  {
    path: 'course',
    component: CourseComponent,
  },
  {
    path: 'course/:id',
    component: CourseDetailComponent,
  },
];
