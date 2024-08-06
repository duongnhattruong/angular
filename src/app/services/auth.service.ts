import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ username: string, role: string }> {
    return this.http.post<any>(`${environment.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        if (response.status) {
          console.log('Login successfully', response.data.username);
          return { username: response.data.username, role: response.data.role } ;
        } else {
          console.log('Login failed');
          return { username: '', role: '' };
        }
      })
    );
  }
}