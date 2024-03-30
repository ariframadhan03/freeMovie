import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { nowPlayingMovieResolver } from './now-playing-movie.resolver';

describe('nowPlayingMovieResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => nowPlayingMovieResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
