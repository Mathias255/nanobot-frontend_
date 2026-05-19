import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/productos/`);
  }

  getMarcas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/marcas/`);
  }

  buscarPorId(tabla: string, id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/?tabla=${tabla}&id=${id}`);
  }
}