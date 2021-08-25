import {Injectable} from '@angular/core';
import {Product} from '../model/product';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Category} from '../model/category';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/api/products');
  }

  constructor(private http: HttpClient) {
  }

  saveProduct(product): Observable<Product> {
    return this.http.post<Product>(API_URL + '/api/products',product);
  }
  findById(id: number): Observable<Product> {
    return this.http.get<Product>(API_URL + '/api/products' + `/${id}`)
    }

  updateProduct(id: number, product: Product): Observable<Product>{
    return this.http.put<Product>(API_URL + '/api/products' + `/${id}`,product);
  }
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(API_URL + '/api/products' + `/${id}`)
  }
}
