// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions  from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.state';
import { Observable } from 'rxjs';
import { selectUsername } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  username$: Observable<string | null>;
  username: any = '';

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.username$ = this.store.select(selectUsername);
  }

  ngOnInit(): void {
    this.username$.subscribe(username => {
      this.username = username;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.store.dispatch(AuthActions.login( {username: data.username, password: data.password} ));
    }
  }
}
