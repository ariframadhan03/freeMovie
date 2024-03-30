import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageService } from '../../pages/homepage/data-access/service/homepage.service';
import { Movie } from '../../pages/movie/interface/movie-interface';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent implements OnInit {
  @Input() data!: Movie;
  @Output() valueChange: EventEmitter<null> = new EventEmitter<null>();

  favoriteIcon: string = 'assets/icons/idle-favorite.png';
  isFavoriteButtonClicked!: boolean;

  constructor(
    public homepageService: HomepageService,
    private _router: Router,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.setInitialValue();
  }

  setInitialValue(): void {
    if (this.data.favorite) {
      this.favoriteIcon = 'assets/icons/active-favorite.png';
    } else {
      this.favoriteIcon = 'assets/icons/idle-favorite.png';
    }
  }

  favoriteHandler(id: number): void {
    this.data.favorite = !this.data.favorite;
    this.isFavoriteButtonClicked = true;
    this.homepageService
      .updateFavorite(id, 'movie', this.data.favorite)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            if (this.data.favorite) {
              this.favoriteIcon = 'assets/icons/active-favorite.png';
              this._toast.success('Success add the movie to favorite');
            } else {
              this.favoriteIcon = 'assets/icons/idle-favorite.png';
              this._toast.success('Movie has been removed from favorite');
            }
          }
          this.valueChange.emit();
          this.isFavoriteButtonClicked = false;
        },
      });
  }

  redirectToDetail(id: number): void {
    if (this.isFavoriteButtonClicked) return;

    this._router.navigate(['/detail/movie/' + id]);
  }
}
