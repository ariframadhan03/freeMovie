import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvDetailComponent } from './tv-detail.component';

describe('TvDetailComponent', () => {
  let component: TvDetailComponent;
  let fixture: ComponentFixture<TvDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
