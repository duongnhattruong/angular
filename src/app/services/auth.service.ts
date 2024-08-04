import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://192.168.1.14:3000/api/login'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post<{ token: string }>(this.apiUrl, { username, password }).pipe(
      map(response => {
        if (response.token) {
          console.log('Login successfully', username);
          return username;
        } else {
          console.log('Login failed');
          return '';
        }
      })
    );
  }
}