import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-star',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss']
})

export class RatingComponent {
  public range: Array<number> = [1, 2, 3, 4, 5];
  @Input() rating: number;
}
