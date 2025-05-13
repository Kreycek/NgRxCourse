import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStore } from "../reducers";

export const selectAuthState=createFeatureSelector<AppStore>('clarion')

export const isLoggedIn= createSelector(
    selectAuthState,
    auth=>!!auth.user
)

export const isLoggedOut =createSelector(
    selectAuthState,
    
    auth=>!auth.user

)