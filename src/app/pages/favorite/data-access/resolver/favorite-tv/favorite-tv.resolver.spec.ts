import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { favoriteTvResolver } from './favorite-tv.resolver';

describe('favoriteTvResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => favoriteTvResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
