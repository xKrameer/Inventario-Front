import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:4000/api/productos/';

  constructor(private http: HttpClient) { }

  getProductos(): Observable <any> {
    return this.http.get(this.url);
  }

  deleteProducto(id: string): Observable <any>{
    return this.http.delete(this.url + id)
  }

  saveProdcuto(producto: Producto): Observable <any>{
    return this.http.post(this.url, producto);
  }

  getProducto(id:string): Observable<any>{
    return this.http.get(this.url + id)
  }

  editProducto(id:string, producto: Producto): Observable<any>{
    return this.http.put(this.url + id, producto);
  }
}
