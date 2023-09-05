import { Component, Input, ChangeDetectorRef, ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'app-progress-loader',
  templateUrl: './progress-loader.component.html',
  styleUrls: ['./progress-loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressLoaderComponent {
  @Input() progress = 0;

  ngOnChanges() {
    this.cdRef.detectChanges();
  }

  constructor(private cdRef: ChangeDetectorRef) { }
}
