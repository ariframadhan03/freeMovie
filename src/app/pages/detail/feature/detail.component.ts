import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { TvDetailComponent } from '../ui/tv-detail/tv-detail.component';
import { MovieDetailComponent } from '../ui/movie-detail/movie-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [TvDetailComponent, MovieDetailComponent, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  data!: any;
  mediaType!: string;
  constructor(private _activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.setInitialValue();
    this.mediaType = this._activatedRoute.snapshot.paramMap.get(
      'mediaType'
    ) as string;
  }

  setInitialValue(): void {
    this._activatedRoute.data.subscribe({
      next: (res: Data) => {
        this.data = res['data'];
      },
    });
  }
}
