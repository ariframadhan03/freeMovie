import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { PageResponse } from '../interface/homepage-interface';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { Movie } from '../../movie/interface/movie-interface';
import { Tv } from '../../tv/interface/tv-interface';
import { TvCardComponent } from '../../../components/tv-card/tv-card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MovieCardComponent, CommonModule, TvCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  nowPlayingMovies!: Movie[];
  popularMovies!: Movie[];
  popularTv!: Tv[];

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.setInitialValue();
  }

  setInitialValue(): void {
    this._activatedRoute.data.subscribe((data: Data) => {
      const nowPlayingMovieResolver: PageResponse<Movie> =
        data['nowPlayingMovies'];
      const popularMovieResolver: PageResponse<Movie> = data['popularMovies'];
      const popularTvResolver: PageResponse<Tv> = data['popularTv'];
      const favoriteMovieResponse: PageResponse<Movie> = data['favoriteMovies'];
      const favoriteTvResponse: PageResponse<Tv> = data['favoriteTv'];

      this.nowPlayingMovies = nowPlayingMovieResolver.results.map(
        (moviePlaying: Movie) => {
          if (
            favoriteMovieResponse.results.some(
              (favorite: Movie) => favorite.id === moviePlaying.id
            )
          ) {
            moviePlaying.favorite = true;
          } else {
            moviePlaying.favorite = false;
          }

          return moviePlaying;
        }
      );

      this.popularMovies = popularMovieResolver.results.map(
        (popularMovie: Movie) => {
          if (
            favoriteMovieResponse.results.some(
              (favorite: Movie) => favorite.id === popularMovie.id
            )
          ) {
            popularMovie.favorite = true;
          } else {
            popularMovie.favorite = false;
          }

          return popularMovie;
        }
      );

      this.popularTv = popularTvResolver.results.map((popularTv: Tv) => {
        if (
          favoriteTvResponse.results.some(
            (favorite: Tv) => favorite.id === popularTv.id
          )
        ) {
          popularTv.favorite = true;
        } else {
          popularTv.favorite = false;
        }

        return popularTv;
      });
    });
  }
}
