import { ActionReducerMap, createReducer, MetaReducer, on } from "@ngrx/store";
import { environment } from "../environments/environment";
import { User } from "../auth/model/user.model";
import { AuthActions } from "../auth/action-types";

export interface AppStore {
    user:User | null
}

export const initialAuthState:AppStore={
    user:null
}

export const authReducer =createReducer(
    initialAuthState,
    on(AuthActions.login,(state,action)=>{
       
        return { 
            ...state,         
            user:action.user
        }
    }),
    
    on(AuthActions.logout, state => ({
        ...state,
        user: null // Ensure user is set to null instead of undefined
    })),

)

// export const reducers:ActionReducerMap<AppState>={


// }

// export const metaReducers: MetaReducer<AppState>[]=!environment.production ?[]:[];