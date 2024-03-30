import { Routes } from '@angular/router';
import { moviesResolver } from './pages/movie/data-access/resolver/movies/movies.resolver';
import { genresResolver } from './pages/homepage/data-access/resolver/genres/genres.resolver';
import { tvResolver } from './pages/tv/data-access/resolver/tv.resolver';
import { favoriteTvResolver } from './pages/favorite/data-access/resolver/favorite-tv/favorite-tv.resolver';
import { favoriteMovieResolver } from './pages/favorite/data-access/resolver/favorite-movie/favorite-movie.resolver';
import { nowPlayingMovieResolver } from './pages/homepage/data-access/resolver/now-playing-movie/now-playing-movie.resolver';
import { popularMovieResolver } from './pages/homepage/data-access/resolver/popular-movie/popular-movie.resolver';
import { popularTvResolver } from './pages/homepage/data-access/resolver/popular-tv/popular-tv.resolver';
import { detailResolver } from './pages/detail/data-access/resolver/detail.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/homepage/feature/homepage.component').then(
        (m) => m.HomepageComponent
      ),
    resolve: {
      nowPlayingMovies: nowPlayingMovieResolver,
      popularMovies: popularMovieResolver,
      popularTv: popularTvResolver,
      favoriteMovies: favoriteMovieResolver,
      favoriteTv: favoriteTvResolver,
    },
  },
  {
    path: 'movie',
    loadComponent: () =>
      import('./pages/movie/feature/movie.component').then(
        (m) => m.MovieComponent
      ),
    resolve: {
      movies: moviesResolver,
      genres: genresResolver,
      favorite: favoriteMovieResolver,
    },
    data: {
      mediaType: 'movie',
    },
  },
  {
    path: 'tv',
    loadComponent: () =>
      import('./pages/tv/feature/tv.component').then((m) => m.TvComponent),
    resolve: {
      tv: tvResolver,
      genres: genresResolver,
      favorite: favoriteTvResolver,
    },
    data: {
      mediaType: 'tv',
    },
  },
  {
    path: 'favorite',
    loadComponent: () =>
      import('./pages/favorite/feature/favorite.component').then(
        (m) => m.FavoriteComponent
      ),
    resolve: {
      tvFavorites: favoriteTvResolver,
      movieFavorites: favoriteMovieResolver,
    },
  },
  {
    path: 'detail/:mediaType/:id',
    loadComponent: () =>
      import('./pages/detail/feature/detail.component').then(
        (m) => m.DetailComponent
      ),
    resolve: {
      data: detailResolver,
    },
  },
];
