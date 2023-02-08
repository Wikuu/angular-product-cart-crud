// ** Angular Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ** RxJs Imports
import { Observable } from 'rxjs';

// ** Type Imports
import {
  Cart,
  CartGetResponse,
  CartPostRequest,
  CartPostResponse,
  ExposedSide,
  HingeSide,
} from '../types/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl: string = 'http://localhost:8000/api/cart';

  constructor(private _http: HttpClient) {}

  addToCart(data: CartPostRequest): Observable<CartPostResponse> {
    return this._http.post<CartPostResponse>(this.baseUrl, data);
  }

  getCartData(): Observable<CartGetResponse> {
    return this._http.get<CartGetResponse>(this.baseUrl);
  }

  changeQuantity(id: number, quantity: number): Observable<CartPostResponse> {
    return this._http.put<CartPostResponse>(`${this.baseUrl}/change-quantity`, {
      id,
      quantity,
    });
  }

  changeSide(
    id: number,
    side: 'hinge_side' | 'exposed_side',
    value: HingeSide | ExposedSide
  ): Observable<CartPostResponse> {
    return this._http.put<CartPostResponse>(`${this.baseUrl}/change-side`, {
      id,
      side,
      value,
    });
  }

  toggleBuildPrice(cart: Cart) {
    return this._http.put<CartPostResponse>(
      `${this.baseUrl}/toggle-build-price`,
      {
        id: cart.id,
        has_build: cart.has_build,
      }
    );
  }

  toggleAllBuildPrice(should_add_build_price: boolean) {
    return this._http.put<CartGetResponse>(
      `${this.baseUrl}/toggle-all-build-price`,
      { should_add_build_price }
    );
  }

  removeItem(id: number): Observable<CartPostResponse> {
    return this._http.delete<CartPostResponse>(`${this.baseUrl}/${id}`);
  }
}
