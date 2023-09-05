import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
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
export class StarRatingComponent {
  
  public _rating!: number;

  @Input()
  rating: number | undefined;

  @Input()
  readonly!: boolean;

  @Output()
  onClick: EventEmitter<number> = new EventEmitter();

  @Output()
  onView: EventEmitter<any> = new EventEmitter();

  @ViewChildren('star')
  private startItems!: QueryList<ElementRef>;

  public _onClick(index: number): void {
    this._rating = index;

    this.onClick.emit(index);
  }

  public _clear(): void {
    this._rating = 0;

    this.onClick.emit();
  }

  public _onHover(index: number): void {
    this.startItems.forEach((element: ElementRef, i: number) => {
      if (i + 1 <= index && (!this._rating || i + 1 > this._rating)) {
        element.nativeElement.classList.add('active');
      }
    });
  }

  public _onHoverOut(index: number): void {
    this.startItems.forEach((element: ElementRef, i: number) => {
      if (i + 1 <= index && (!this._rating || i + 1 > this._rating)) {
        element.nativeElement.classList.remove('active');
      }
    });
  }
}
