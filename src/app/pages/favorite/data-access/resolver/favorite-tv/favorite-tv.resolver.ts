import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { FavoriteService } from '../../service/favorite.service';
import { tap } from 'rxjs';
import { PageResponse } from '../../../../homepage/interface/homepage-interface';
import { Tv } from '../../../../tv/interface/tv-interface';

export const favoriteTvResolver: ResolveFn<PageResponse<Tv>> = (
  route,
  state
) => {
  const favoriteService = inject(FavoriteService);

  return favoriteService.getFavorites('tv').pipe(
    tap({
      next: (response: PageResponse<Tv>) => response,
      error: (err: any) => console.error(err),
    })
  );
};
