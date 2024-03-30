import { ResolveFn } from '@angular/router';
import { HomepageService } from '../../service/homepage.service';
import { inject } from '@angular/core';
import { PageResponse } from '../../../interface/homepage-interface';
import { Movie } from '../../../../movie/interface/movie-interface';
import { tap } from 'rxjs';

export const nowPlayingMovieResolver: ResolveFn<PageResponse<Movie>> = () => {
  const homepageService = inject(HomepageService);

  return homepageService.getNowPlayingMovies().pipe(
    tap({
      next: (response: PageResponse<Movie>) => response,
      error: (err: any) => console.error(err),
    })
  );
};
