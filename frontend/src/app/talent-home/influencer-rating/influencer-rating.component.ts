import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-influencer-rating',
  templateUrl: './influencer-rating.component.html',
  styleUrls: ['./influencer-rating.component.css']
})
export class InfluencerRatingComponent implements OnInit {
  influencerForm!: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.influencerForm = this.fb.group({
      responseRate: ['', Validators.required],
      contentQuality: ['', Validators.required],
      creativity: ['', Validators.required],
      flexibility: ['', Validators.required],
      campaignPerformance: ['', Validators.required],

      notes: ['', Validators.maxLength(500)]
    });
  }

  onRatingClicked(event: any, fieldName: string): void {
    const rating = parseInt(event.target.dataset.rating, 10);
    this.influencerForm.controls[fieldName].setValue(rating);
  }

  onSubmit(): void {
    console.log(this.influencerForm.value);
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
