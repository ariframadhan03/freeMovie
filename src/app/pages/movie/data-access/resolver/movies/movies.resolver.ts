import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { tap } from 'rxjs';
import { PageResponse } from '../../../../homepage/interface/homepage-interface';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../../interface/movie-interface';

export const moviesResolver: ResolveFn<PageResponse<Movie>> = (
  route,
  state
) => {
  const movieService = inject(MovieService);

  return movieService.getMovies().pipe(
    tap({
      next: (response: PageResponse<Movie>) => response,
      error: (err: any) => console.error(err),
    })
  );
};
