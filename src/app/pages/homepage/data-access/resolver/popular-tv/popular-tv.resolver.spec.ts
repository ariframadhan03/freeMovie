import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { popularTvResolver } from './popular-tv.resolver';

describe('popularTvResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => popularTvResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
