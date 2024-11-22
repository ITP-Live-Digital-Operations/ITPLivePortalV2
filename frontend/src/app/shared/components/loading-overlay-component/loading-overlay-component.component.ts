import { Component } from '@angular/core';
import { LoadingOverlayServiceService } from 'src/app/core/Services/loading-overlay.service';

@Component({
  selector: 'app-loading-overlay-component',
  templateUrl: './loading-overlay-component.component.html',
  styleUrls: ['./loading-overlay-component.component.scss']
})
export class LoadingOverlayComponentComponent {
  constructor(public loadingOverlay: LoadingOverlayServiceService) {}

}
