import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${environment.tmdbToken}`);

  constructor(private _httpClient: HttpClient) {}

  getDetail(mediaType: string, id: number): Observable<any> {
    return this._httpClient
      .get(`${environment.baseUrl}${mediaType}/${id}`, {
        headers: this.headers,
      })
      .pipe(
        tap({
          next: (response: any) => response,
          error: (err: any) => console.error(err),
        })
      );
  }
}
