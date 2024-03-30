import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tvResolver } from './tv.resolver';
import { PageResponse } from '../../../homepage/interface/homepage-interface';
import { Tv } from '../../interface/tv-interface';

describe('tvResolver', () => {
  const executeResolver: ResolveFn<PageResponse<Tv>> = (
    ...resolverParameters
  ) => TestBed.runInInjectionContext(() => tvResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
