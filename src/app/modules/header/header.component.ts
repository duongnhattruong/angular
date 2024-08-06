// src/app/header/header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout, selectIsLoggedIn, selectRole, selectUsername } from 'src/app/store/auth';
import { AuthState } from '../../store/auth/auth.state';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedin = false;
  username : string|null = '';
  role : string|null = '';

  constructor(private router: Router, private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.store.select(selectIsLoggedIn).subscribe(value => {
        this.isLoggedin = value;
    })

    this.store.select(selectUsername).subscribe(value => {
      this.username = value;
    })

    this.store.select(selectRole).subscribe(value => {
      this.role = value;
  })
  
  }

  onLogout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
