import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatCardModule} from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "./auth.service";
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './auth.guard';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild([{path: '', component: LoginComponent}]),
        EffectsModule.forFeature([])
        
        
// StoreModule.forRoot({
//  tess: authReducer
//     })

    
// StoreModule.forRoot({
//      Auth: authReducer
//     })


    ],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
              AuthService,
              AuthGuard
            ]
        }
    }
}