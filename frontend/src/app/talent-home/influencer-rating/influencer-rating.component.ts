import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InfluencerService } from 'src/app/core/Services/influencer.service';
import { UserService } from 'src/app/core/Services/user.service';
import * as alertify from 'alertifyjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-influencer-rating',
  templateUrl: './influencer-rating.component.html',
  styleUrls: ['./influencer-rating.component.css']
})
export class InfluencerRatingComponent implements OnInit {
  influencerForm!: FormGroup;
  influencerName: any;
  influencerID: any;
  data: any;
  influenceRatings: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort !: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;



  constructor(private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private influencerService: InfluencerService ){ }

  GetInfluencerRatings(id: any) {
    return this.influencerService.getInfluencerRatings(id).subscribe((item) => {
      console.log(item);

      this.influenceRatings = item;

      this.dataSource = new MatTableDataSource(this.influenceRatings.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
    this.influencerForm = this.fb.group({
      responseRate: ['', Validators.required],
      contentQuality: ['', Validators.required],
      creativity: ['', Validators.required],
      flexibility: ['', Validators.required],
      campaignPerformance: ['', Validators.required],

      notes: ['', Validators.maxLength(500)]
    });


    this.influencerID = this.route.snapshot.paramMap.get('id');
    this.GetInfluencerRatings(this.influencerID);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

  }



  displayedColumns: string[] = ['responseRate', 'contentQuality', 'creativity', 'flexibility', 'campaignPerformance', 'notes', 'name', 'createdAt'];

  onRatingClicked(event: any, fieldName: string): void {
    const rating = parseInt(event.target.dataset.rating, 10);
    this.influencerForm.controls[fieldName].setValue(rating);
  }


  onSubmit(): void {

    this.influencerService.createInfluencerRating({ influencer_id: this.influencerID , createdBy_id: this.userService.getID(),...this.influencerForm.value}).subscribe((item) => {
      this.data = item;
      if( this.data.status == 'success'){
        alertify.success('Rating Added Successfully');
      }
  });
  }
  backButton() {
    window.history.back();
  }

  handleClickResponseRate(index : number) {
    this.influencerForm.controls['responseRate'].setValue(index);
  }

  handleClickContentQuality(index : number) {
    this.influencerForm.controls['contentQuality'].setValue(index);
  }
  handleClickCreativity(index : number) {
    this.influencerForm.controls['creativity'].setValue(index);
  }

  handleClickFlexibility(index : number) {
    this.influencerForm.controls['flexibility'].setValue(index);
  }

  handleClickCampaignPerformance(index : number) {
    this.influencerForm.controls['campaignPerformance'].setValue(index);
  }











}


