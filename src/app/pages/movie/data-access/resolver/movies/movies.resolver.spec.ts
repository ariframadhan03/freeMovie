import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { moviesResolver } from './movies.resolver';
import { PageResponse } from '../../../../homepage/interface/homepage-interface';

describe('moviesResolver', () => {
  const executeResolver: ResolveFn<PageResponse> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => moviesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
