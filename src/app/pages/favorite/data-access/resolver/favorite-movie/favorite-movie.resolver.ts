import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { FavoriteService } from '../../service/favorite.service';
import { tap } from 'rxjs';
import { PageResponse } from '../../../../homepage/interface/homepage-interface';
import { Movie } from '../../../../movie/interface/movie-interface';

export const favoriteMovieResolver: ResolveFn<PageResponse<Movie>> = (
  route,
  state
) => {
  const favoriteService = inject(FavoriteService);

  return favoriteService.getFavorites('movies').pipe(
    tap({
      next: (response: PageResponse<Movie>) => response,
      error: (err: any) => console.error(err),
    })
  );
};
