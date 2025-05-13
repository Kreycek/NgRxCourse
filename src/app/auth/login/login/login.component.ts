import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { noop, tap } from 'rxjs';
import { AppStore } from '../../../reducers';
import { Store } from '@ngrx/store';
import { login } from '../../auth.actions';
import { AuthActions } from '../../action-types';

@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent {
  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store:Store<AppStore>
    ) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
      const val=this.form.value;

     
     
      this.auth.login(val.email, val.password)   .pipe(
      tap((user) => {

        const loginNewAction=AuthActions.login({user:user});

        console.log('login new action ',loginNewAction);

        this.store.dispatch(loginNewAction)
        this.router.navigateByUrl('/courses')
      
      }) )
      .subscribe({
      next: noop, // não faz nada quando o login é bem-sucedido
      error: () => alert('erro no login')

      });

  }
}
