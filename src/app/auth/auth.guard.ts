import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AppStore } from "../reducers";
import { select, Store } from "@ngrx/store";
import { isLoggedIn } from "./auth.selectors";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{


    constructor(
        private store:Store<AppStore>,
        private router:Router
    ){
        
    }
    canActivate(): Observable<boolean> {
        return this.store
        .pipe(
            select(isLoggedIn),
            tap(loggedIn=>{
                if(!loggedIn) {
                    this.router.navigateByUrl('/login')
                }
            })
        )
    }
}