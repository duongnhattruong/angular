import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  addToCart(id: string): Observable<any> {
    // Modify API endpoint or request body as needed
    return this.http.post<any>(environment.apiUrl + '/addToCart', { id });
  }

  getCart(): Observable<any[]> {
    return this.http.get<{message: string; data: any[]}>(environment.apiUrl + '/getCart').pipe(
        map(response => response.data)
      )
  }
}

