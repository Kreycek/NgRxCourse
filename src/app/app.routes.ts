


  import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { CoursesModule } from './courses/courses.module';
import { LoginComponent } from './auth/login/login/login.component';
import { HomeComponent } from './courses/home/home.component';

export const routes : Routes= [
    // { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    {
        path:'login',
        component:LoginComponent,
    },
    {
        path: 'courses',
        component:HomeComponent,
    }
];

