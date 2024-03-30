import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { favoriteMovieResolver } from './favorite-movie.resolver';
import { PageResponse } from '../../../../homepage/interface/homepage-interface';
import { Movie } from '../../../../movie/interface/movie-interface';

describe('favoriteMovieResolver', () => {
  const executeResolver: ResolveFn<PageResponse<Movie>> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      favoriteMovieResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
