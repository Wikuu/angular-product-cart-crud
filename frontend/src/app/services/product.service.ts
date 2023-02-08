import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ProductGetResponse,
  Product,
  ProductPostResponse,
  ProductDeleteResponse,
} from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = 'http://localhost:8000/api/product';

  constructor(private _http: HttpClient) {}

  addProduct(product: Product): Observable<ProductPostResponse> {
    return this._http.post<ProductPostResponse>(this.baseUrl, product);
  }

  getProducts(): Observable<ProductGetResponse> {
    return this._http.get<ProductGetResponse>(this.baseUrl);
  }

  updateProduct(id: number, product: Product): Observable<ProductPostResponse> {
    return this._http.put<ProductPostResponse>(
      `${this.baseUrl}/${id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<ProductDeleteResponse> {
    return <Observable<ProductDeleteResponse>>(
      this._http.delete(`${this.baseUrl}/${id}`)
    );
  }
}
