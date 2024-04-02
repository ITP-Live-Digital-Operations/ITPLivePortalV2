import { Component, ViewChild, Inject } from '@angular/core';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-influencer-id',
  templateUrl: './influencer-id.component.html',
  styleUrls: ['./influencer-id.component.scss'],
})
export class InfluencerIdComponent {
  public id: number = this.source.id;
  public influencerData: any;
  public influencerRating: any;
  public users: any = {};
  public selectedComponent: string = 'basicInfo'; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private service: InfluencerService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public source: any,
    private dialogRef: MatDialogRef<InfluencerIdComponent>
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      data.forEach((user) => {
        this.users[user.id] = user.name;
      });
    });
    this.GetInfluencerData(this.source.id);
    this.GetInfluencerRating(this.source.id);
  }
  selectComponent(component: string) {
    this.selectedComponent = component;
  }

  private GetInfluencerData(inputdata: any): void {
    this.service.getInfluencer(inputdata).subscribe((item) => {
      this.influencerData = item;
    });
  }

  private GetInfluencerRating(inputdata: any): void {
    this.service.getAverageInfluencerRating(inputdata).subscribe((item) => {
      this.influencerRating = item;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
