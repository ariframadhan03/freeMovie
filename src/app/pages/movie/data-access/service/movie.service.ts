import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PageResponse } from '../../../homepage/interface/homepage-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Movie } from '../../interface/movie-interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${environment.tmdbToken}`);

  constructor(private _httpClient: HttpClient) {}

  getMovies(): Observable<PageResponse<Movie>> {
    return this._httpClient
      .get(`${environment.baseUrl}/discover/movie`, { headers: this.headers })
      .pipe(
        tap({
          next: (response: any) => response,
          error: (error: any) => console.error(error),
        })
      );
  }
}
