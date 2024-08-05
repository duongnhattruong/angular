import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://192.168.1.14:3000/api'; 


  constructor(private http: HttpClient) {}

  addToCart(id: string): Observable<any> {
    // Modify API endpoint or request body as needed
    return this.http.post<any>(this.apiUrl + '/addToCart', { id });
  }

  getCart(): Observable<any[]> {
    return this.http.get<{message: string; data: any[]}>(this.apiUrl + '/cart').pipe(
        map(response => response.data)
      )
  }
}

