import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageService } from '../../pages/homepage/data-access/service/homepage.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tv-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tv-card.component.html',
  styleUrl: './tv-card.component.css',
})
export class TvCardComponent implements OnInit {
  @Input() data!: any;
  @Input() readonly!: boolean;
  @Output() favoriteChange: EventEmitter<null> = new EventEmitter<null>();

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
      .updateFavorite(id, 'tv', this.data.favorite)
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

          this.favoriteChange.emit();
          this.isFavoriteButtonClicked = false;
        },
      });
  }

  redirectToDetail(id: number): void {
    if (this.isFavoriteButtonClicked || this.readonly) return;

    this._router.navigate(['/detail/tv/' + id]);
  }
}
