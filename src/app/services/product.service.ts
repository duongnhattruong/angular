import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://192.168.1.14:3000/api/products'; 

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<{ message: string; data: any[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${product.id}`, product);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }
}
