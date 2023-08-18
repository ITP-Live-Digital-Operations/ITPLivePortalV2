import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-influencer-rating',
  templateUrl: './influencer-rating.component.html',
  styleUrls: ['./influencer-rating.component.scss'],
})
export class InfluencerRatingComponent {
  influencerForm: FormGroup;
  influencerName: any;
  influencerID: any;
  data: any;
  influenceRatings: any;
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService,
    private influencerService: InfluencerService
  ) {
    this.influencerForm = this.formBuilder.group({
      responseRate: ['', Validators.required],
      contentQuality: ['', Validators.required],
      creativity: ['', Validators.required],
      flexibility: ['', Validators.required],
      campaignPerformance: ['', Validators.required],

      notes: ['', Validators.maxLength(500)],
    });
  }

  GetInfluencerRatings(id: any) {
    return this.influencerService.getInfluencerRatings(id).subscribe((item) => {
      console.log(item);

      this.influenceRatings = item;

      this.dataSource = new MatTableDataSource(this.influenceRatings.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.influencerID = this.route.snapshot.paramMap.get('id');
    this.GetInfluencerRatings(this.influencerID);
  }

  displayedColumns: string[] = [
    'responseRate',
    'contentQuality',
    'creativity',
    'flexibility',
    'campaignPerformance',
    'notes',
    'name',
    'createdAt',
  ];

  onRatingClicked(event: any, fieldName: string): void {
    const rating = parseInt(event.target.dataset.rating, 10);
    this.influencerForm.controls[fieldName].setValue(rating);
  }

  onSubmit(): void {
    this.influencerService
      .createInfluencerRating({
        influencer_id: this.influencerID,
        createdBy_id: this.userService.getID(),
        ...this.influencerForm.value,
      })
      .subscribe((item) => {
        this.data = item;
        if (this.data.status == 'success') {
          this.toastrService.success('Rating Added Successfully');
        }
      });
  }

  handleClickResponseRate(index: number) {
    this.influencerForm.controls['responseRate'].setValue(index);
  }

  handleClickContentQuality(index: number) {
    this.influencerForm.controls['contentQuality'].setValue(index);
  }
  handleClickCreativity(index: number) {
    this.influencerForm.controls['creativity'].setValue(index);
  }

  handleClickFlexibility(index: number) {
    this.influencerForm.controls['flexibility'].setValue(index);
  }

  handleClickCampaignPerformance(index: number) {
    this.influencerForm.controls['campaignPerformance'].setValue(index);
  }
}
