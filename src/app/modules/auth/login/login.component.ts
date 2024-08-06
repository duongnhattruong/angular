// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions  from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.state';
import { Observable } from 'rxjs';
import { selectIsLoggedIn, selectRole, selectUsername } from 'src/app/store/auth/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  username: any = '';
  role: any = '';

  constructor(private fb: FormBuilder, private router: Router,private store: Store<AuthState>) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.store.select(selectUsername).subscribe(value => {
      this.username = value;
    });

    this.store.select(selectRole).subscribe(value => {
      this.role = value;
    });

    this.store.select(selectIsLoggedIn).subscribe(isLogin => {
      if(isLogin){
      
        if(this.role === 'admin'){
          this.router.navigate(['/home']);
        }
        else{
          this.router.navigate(['/order']);
        }
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.store.dispatch(AuthActions.login( {username: data.username, password: data.password} ));
    }
  }
}
