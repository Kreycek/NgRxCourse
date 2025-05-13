import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppStore } from './reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { AuthActions } from './auth/action-types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports:[
      MatSidenavModule,
      MatIconModule,
      MatToolbarModule,
      MatListModule,
      MatProgressSpinnerModule,
      RouterModule,
      CommonModule
    ],
    standalone: true
})
export class AppComponent implements OnInit {

    loading = true;

    idLoggedIn$:Observable<boolean>

    idLoggedOut$:Observable<boolean>

    constructor(
      private router: Router, 
      private store: Store<AppStore>) {

    }

    ngOnInit() {

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      this.store.subscribe((response)=>{
        console.log('Captura da store ',response)
      })

     this.idLoggedIn$= this.store.pipe(      
          select(isLoggedIn),
          //O operador abaixo só pode ser usado caso seja o angular o de cima é no ngrx
          // distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)) 
      )

      // this.idLoggedIn$= this.store.pipe(      
      //   select((state:any)=> !!state['clarion'].user)     
      //   //O operador abaixo só pode ser usado caso seja o angular o de cima é no ngrx
      //   // distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)) 
      // )


      // this.idLoggedOut$= this.store.pipe(
      //   select((state:any)=> !state['clarion'].user)     
      // )

      this.idLoggedOut$= this.store.pipe(
        select(isLoggedOut)     
      )

      

    }

    logout() {
      this.store.dispatch(AuthActions.logout())
      this.router.navigateByUrl('/login')
    }

}