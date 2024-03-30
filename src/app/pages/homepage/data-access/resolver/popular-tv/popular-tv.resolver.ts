import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HomepageService } from '../../service/homepage.service';
import { tap } from 'rxjs';
import { PageResponse } from '../../../interface/homepage-interface';
import { Movie } from '../../../../movie/interface/movie-interface';

export const popularTvResolver: ResolveFn<PageResponse<Movie>> = () => {
  const homepageService = inject(HomepageService);

  return homepageService.getPopularTv().pipe(
    tap({
      next: (response: PageResponse<Movie>) => response,
      error: (err: any) => console.error(err),
    })
  );
};
