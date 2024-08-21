import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<{ message: string; data: any[] }>(`${environment.apiUrl}/getProduct`).pipe(
      map(response => response.data)
    );
  }

  getProductsByPage(pageNumber: number, pageSize: number): Observable<any[]> {
    return this.http.get<{ message: string; data: any[] }>(`${environment.apiUrl}/getProduct`, {
      params: { pageNumber: pageNumber.toString(), pageSize: pageSize.toString() }
    }).pipe(
      map(response => response.data)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/deleteProduct/${id}`);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/updateProduct`, product);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/addProduct`, product);
  }
}
