import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tv, TvData } from '../interface/tv-interface';
import { ActivatedRoute, Data } from '@angular/router';
import {
  MovieGenre,
  MovieGenreResponse,
  PageResponse,
} from '../../homepage/interface/homepage-interface';
import { TvCardComponent } from '../../../components/tv-card/tv-card.component';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [TvCardComponent, CommonModule],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.css',
})
export class TvComponent {
  tv!: TvData[];

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.setInitialValue();
  }

  setInitialValue(): void {
    this._activatedRoute.data.subscribe((data: Data) => {
      const tvResponse: PageResponse<Tv> = data['tv'];
      const genresResponse: MovieGenreResponse = data['genres'];
      const favoriteResponse: PageResponse<Tv> = data['favorite'];

      this.tv = [];

      genresResponse.genres.forEach((genre: MovieGenre) => {
        this.tv.push({
          genre: genre.name,
          film: tvResponse.results.filter((movie: Tv) =>
            movie.genre_ids.includes(genre.id)
          ),
        });
      });

      this.tv.map((tvData: TvData) => {
        tvData.film.map((tv: Tv) => {
          tv.genre_names = tv.genre_ids?.map(
            (genreId: number) =>
              genresResponse.genres.filter(
                (genre: MovieGenre) => genre.id === genreId
              )[0].name
          );
          tv.genre_names.length = 2;

          if (
            favoriteResponse.results.some(
              (favorite: Tv) => favorite.id === tv.id
            )
          ) {
            tv.favorite = true;
          } else {
            tv.favorite = false;
          }

          return tv;
        });
        return tvData;
      });
    });
  }
}
