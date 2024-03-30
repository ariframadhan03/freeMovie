import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { genresResolver } from './genres.resolver';
import { MovieGenreResponse } from '../../../interface/homepage-interface';

describe('genresResolver', () => {
  const executeResolver: ResolveFn<MovieGenreResponse> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() => genresResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
