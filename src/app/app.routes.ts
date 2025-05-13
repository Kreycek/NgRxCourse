


  import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { HomeComponent } from './courses/home/home.component';
import { AuthGuard } from './auth/auth.guard';

export const routes : Routes= [
    // { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    {
        path:'login',
        component:LoginComponent,
    },
    {
        path: 'courses',
        loadChildren:()=>import('./courses/courses.module').then(m=>m.CoursesModule),
        canActivate:[AuthGuard],
        // component:HomeComponent,
    }
];

