import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HomepageService } from '../../service/homepage.service';
import { tap } from 'rxjs';
import { MovieGenreResponse } from '../../../interface/homepage-interface';

export const genresResolver: ResolveFn<MovieGenreResponse> = (route, state) => {
  const homepageService = inject(HomepageService);
  const mediaType: string = route.data['mediaType'];

  return homepageService.getMovieGenres(mediaType).pipe(
    tap({
      next: (response: MovieGenreResponse) => response,
      error: (err: any) => console.error(err),
    })
  );
};
