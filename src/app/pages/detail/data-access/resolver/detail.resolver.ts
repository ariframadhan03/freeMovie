import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DetailService } from '../service/detail.service';
import { tap } from 'rxjs';

export const detailResolver: ResolveFn<boolean> = (route, state) => {
  const detailService = inject(DetailService);
  const mediaType: string = route.paramMap.get('mediaType') as string;
  const id: string = route.paramMap.get('id') as string;

  return detailService.getDetail(mediaType, +id).pipe(
    tap({
      next: (res: any) => res,
      error: (err: any) => console.error(err),
    })
  );
};
