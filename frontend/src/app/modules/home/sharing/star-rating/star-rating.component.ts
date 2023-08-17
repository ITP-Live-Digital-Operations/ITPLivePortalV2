import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'm-star-rating',
    '[class.readonly]': 'readonly',
  },
})
export class StarRatingComponent implements OnChanges {
  _rating!: number;

  @Input() rating: number | undefined;
  @Input() readonly!: boolean;

  @Output() onClick: EventEmitter<number> = new EventEmitter();
  @Output() onView: EventEmitter<any> = new EventEmitter();

  @ViewChildren('star') private startItems!: QueryList<ElementRef>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this._rating = this.rating || 0;
  }

  _onClick(index: number) {
    this._rating = index;

    this.onClick.emit(index);
  }

  _clear() {
    this._rating = 0;

    this.onClick.emit();
  }

  _onHover(index: number) {
    this.startItems.forEach((element: ElementRef, i: number) => {
      if (i + 1 <= index && (!this._rating || i + 1 > this._rating)) {
        element.nativeElement.classList.add('active');
      }
    });
  }

  _onHoverOut(index: number) {
    this.startItems.forEach((element: ElementRef, i: number) => {
      if (i + 1 <= index && (!this._rating || i + 1 > this._rating)) {
        element.nativeElement.classList.remove('active');
      }
    });
  }
}
