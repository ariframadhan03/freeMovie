import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  MovieGenreResponse,
  PageResponse,
} from '../../interface/homepage-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Movie } from '../../../movie/interface/movie-interface';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${environment.tmdbToken}`);

  constructor(private _httpClient: HttpClient) {}

  getMovieGenres(mediaType: string): Observable<MovieGenreResponse> {
    return this._httpClient
      .get(`${environment.baseUrl}/genre/${mediaType}/list`, {
        headers: this.headers,
      })
      .pipe(
        tap({
          next: (response: any) => response,
          error: (error: any) => console.error(error),
        })
      );
  }

  generateImage(imageName: string): string {
    return `${environment.tmdbImageUrl}${imageName}`;
  }

  updateFavorite(
    id: number,
    mediaType: string,
    favorite: boolean
  ): Observable<any> {
    const payload = {
      media_type: mediaType,
      media_id: id,
      favorite,
    };

    return this._httpClient
      .post(
        `${environment.baseUrl}/account/${environment.accountId}/favorite`,
        payload,
        { headers: this.headers }
      )
      .pipe(
        tap({
          next: (response: any) => response,
          error: (error: any) => console.error(error),
        })
      );
  }

  getNowPlayingMovies(): Observable<PageResponse<Movie>> {
    return this._httpClient
      .get<PageResponse<Movie>>(`${environment.baseUrl}/movie/now_playing`, {
        headers: this.headers,
      })
      .pipe(
        tap({
          next: (response: PageResponse<Movie>) => response,
          error: (error: any) => console.error(error),
        })
      );
  }

  getPopularMovies(): Observable<PageResponse<Movie>> {
    return this._httpClient
      .get<PageResponse<Movie>>(`${environment.baseUrl}/movie/popular`, {
        headers: this.headers,
      })
      .pipe(
        tap({
          next: (response: PageResponse<Movie>) => response,
          error: (error: any) => console.error(error),
        })
      );
  }

  getPopularTv(): Observable<PageResponse<Movie>> {
    return this._httpClient
      .get<PageResponse<Movie>>(`${environment.baseUrl}/tv/popular`, {
        headers: this.headers,
      })
      .pipe(
        tap({
          next: (response: PageResponse<Movie>) => response,
          error: (error: any) => console.error(error),
        })
      );
  }
}
