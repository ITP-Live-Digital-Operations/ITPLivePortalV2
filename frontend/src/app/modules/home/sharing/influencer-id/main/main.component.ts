import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InfluencerIdComponent } from '../influencer-id.component';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  @Input() 
  id!: number;

  @Input() 
  profileData: any;

  @Input() 
  influencerRating: any;

  @Input() 
  isReviewVisible: any;

  private path = PATH;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<InfluencerIdComponent>
    ) { }

  rateInfluencer() {
    this.router.navigate([`${this.path['influencerRating'] + this.id}`]);
    this.dialogRef.close();
  }
}
