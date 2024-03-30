import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { popularMovieResolver } from './popular-movie.resolver';
import { PageResponse } from '../../../interface/homepage-interface';
import { Movie } from '../../../../movie/interface/movie-interface';

describe('popularMovieResolver', () => {
  const executeResolver: ResolveFn<PageResponse<Movie>> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      popularMovieResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
