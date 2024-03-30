import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import {
  DetailGenre,
  MovieDetail,
  SpokkenLanguage,
} from '../../interface/detail-interface';
import { HomepageService } from '../../../homepage/data-access/service/homepage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  data!: MovieDetail;
  genres!: string;
  languages!: string;
  releaseYear!: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    public homepageService: HomepageService
  ) {}

  ngOnInit(): void {
    this.setInitialValue();
  }

  setInitialValue(): void {
    this._activatedRoute.data.subscribe({
      next: (res: Data) => {
        this.data = res['data'];

        this.genres = this.data.genres
          .map((genre: DetailGenre) => genre.name)
          .toString()
          .replaceAll(',', ', ');

        this.languages = this.data.spoken_languages
          .map((language: SpokkenLanguage) => language.english_name)
          .toString()
          .replaceAll(',', ', ');

        this.releaseYear = new Date(this.data.release_date).getFullYear();
      },
    });
  }
}
