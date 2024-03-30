import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { Movie, MovieData } from '../interface/movie-interface';
import { ActivatedRoute, Data } from '@angular/router';
import {
  MovieGenre,
  MovieGenreResponse,
  PageResponse,
} from '../../homepage/interface/homepage-interface';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent implements OnInit {
  movies!: MovieData[];

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.setInitialValue();
  }

  setInitialValue(): void {
    this._activatedRoute.data.subscribe((data: Data) => {
      const moviesResponse: PageResponse<Movie> = data['movies'];
      const movieGenresResponse: MovieGenreResponse = data['genres'];
      const favoriteResponse: PageResponse<Movie> = data['favorite'];

      this.movies = [];

      movieGenresResponse.genres.forEach((genre: MovieGenre) => {
        this.movies.push({
          genre: genre.name,
          movie: moviesResponse.results.filter((movie: Movie) =>
            movie.genre_ids.includes(genre.id)
          ),
        });
      });

      this.movies.map((movieData: MovieData) => {
        movieData.movie.map((movie: Movie) => {
          movie.genre_names = movie.genre_ids?.map(
            (genreId: number) =>
              movieGenresResponse.genres.filter(
                (genre: MovieGenre) => genre.id === genreId
              )[0].name
          );
          movie.genre_names.length = 2;

          if (
            favoriteResponse.results.some(
              (favorite: Movie) => favorite.id === movie.id
            )
          ) {
            movie.favorite = true;
          } else {
            movie.favorite = false;
          }

          return movie;
        });
        return movieData;
      });
    });
  }
}
