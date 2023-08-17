import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { InfluencerIdComponent } from '../influencer-id.component';
import { Subscription, filter } from 'rxjs';

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
  
  private routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<InfluencerIdComponent>
    ) { }

  rateInfluencer() {
    this.router.navigate([`/home/talent/influencerRating/${this.id}`]);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
