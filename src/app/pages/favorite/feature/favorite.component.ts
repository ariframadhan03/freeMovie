import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { TvCardComponent } from '../../../components/tv-card/tv-card.component';
import { ActivatedRoute, Data } from '@angular/router';
import { PageResponse } from '../../homepage/interface/homepage-interface';
import { Movie } from '../../movie/interface/movie-interface';
import { Tv } from '../../tv/interface/tv-interface';
import { CommonModule } from '@angular/common';
import { HomepageService } from '../../homepage/data-access/service/homepage.service';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [MovieCardComponent, TvCardComponent, CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
})
export class FavoriteComponent implements OnInit {
  movies!: Movie[];
  tv!: Tv[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _homepageService: HomepageService
  ) {}

  ngOnInit(): void {
    this.setInitialValue();
  }

  setInitialValue(): void {
    this._activatedRoute.data.subscribe({
      next: (res: Data) => {
        const movieFavoriteResponse: PageResponse<Movie> =
          res['movieFavorites'];
        const tvFavoriteResponse: PageResponse<Tv> = res['tvFavorites'];

        this.movies = movieFavoriteResponse.results.map((movieFav: Movie) => {
          movieFav.favorite = true;
          return movieFav;
        });

        this.tv = tvFavoriteResponse.results.map((tvFav: Tv) => {
          tvFav.favorite = true;
          return tvFav;
        });
      },
    });
  }

  removeFavoriteHandler(id: number, mediaType: string): void {
    this._homepageService.updateFavorite(id, mediaType, false).subscribe({
      next: () => {
        if (mediaType === 'movie') {
          this.movies = this.movies.filter((movie: Movie) => movie.id !== id);
        } else {
          this.tv = this.tv.filter((tv: Tv) => tv.id !== id);
        }
      },
    });
  }
}
