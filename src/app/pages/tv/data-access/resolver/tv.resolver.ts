import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TvService } from '../service/tv.service';
import { tap } from 'rxjs';
import { PageResponse } from '../../../homepage/interface/homepage-interface';
import { Tv } from '../../interface/tv-interface';

export const tvResolver: ResolveFn<PageResponse<Tv>> = (route, state) => {
  const tvService = inject(TvService);

  return tvService.getTvList().pipe(
    tap({
      next: (respose: PageResponse<Tv>) => respose,
      error: (err: any) => console.error(err),
    })
  );
};
