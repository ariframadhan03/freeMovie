import { Component, OnInit } from '@angular/core';
import {
  CreatedBy,
  DetailGenre,
  SpokkenLanguage,
  TvDetail,
} from '../../interface/detail-interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Data } from '@angular/router';
import { HomepageService } from '../../../homepage/data-access/service/homepage.service';
import { TvCardComponent } from '../../../../components/tv-card/tv-card.component';

@Component({
  selector: 'app-tv-detail',
  standalone: true,
  imports: [CommonModule, TvCardComponent],
  templateUrl: './tv-detail.component.html',
  styleUrl: './tv-detail.component.css',
})
export class TvDetailComponent implements OnInit {
  data!: TvDetail;
  genres!: string;
  languages!: string;
  releaseYear!: number;
  creator!: string;

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

        this.releaseYear = new Date(this.data.first_air_date).getFullYear();

        this.creator = this.data.created_by
          .map((creator: CreatedBy) => creator.name)
          .toString()
          .replaceAll(',', ', ');
      },
    });
  }
}
