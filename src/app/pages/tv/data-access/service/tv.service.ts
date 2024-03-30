import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PageResponse } from '../../../homepage/interface/homepage-interface';
import { Tv } from '../../interface/tv-interface';

@Injectable({
  providedIn: 'root',
})
export class TvService {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${environment.tmdbToken}`);

  constructor(private _httpClient: HttpClient) {}

  getTvList(): Observable<PageResponse<Tv>> {
    return this._httpClient
      .get<PageResponse<Tv>>(`${environment.baseUrl}/discover/tv`, {
        headers: this.headers,
      })
      .pipe(
        tap({
          next: (response: PageResponse<Tv>) => response,
          error: (error: any) => console.error(error),
        })
      );
  }
}
