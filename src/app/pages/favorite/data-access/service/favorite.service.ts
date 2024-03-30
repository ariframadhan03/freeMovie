import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PageResponse } from '../../../homepage/interface/homepage-interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${environment.tmdbToken}`);

  constructor(private _httpClient: HttpClient) {}

  getFavorites(mediaType: string): Observable<PageResponse<any>> {
    return this._httpClient
      .get<PageResponse<any>>(
        `${environment.baseUrl}/account/${environment.accountId}/favorite/${mediaType}?sort_by=created_at.desc`,
        { headers: this.headers }
      )
      .pipe(
        tap({
          next: (response: PageResponse<any>) => response,
          error: (error: any) => console.error(error),
        })
      );
  }
}
