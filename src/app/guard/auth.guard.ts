import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthState, selectIsLoggedIn } from '../store/auth';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLogin = false;

  constructor(private store: Store<AuthState>, private authService: AuthService, private router: Router) {
    this.store.select(selectIsLoggedIn).subscribe(value => {
        this.isLogin = value;
    }
  )
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isLogin) {
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
