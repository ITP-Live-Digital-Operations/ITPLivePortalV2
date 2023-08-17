import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-all-info',
  templateUrl: './all-info.component.html',
  styleUrls: ['./all-info.component.scss']
})
export class AllInfoComponent {
  @Input() brief: any;
}
