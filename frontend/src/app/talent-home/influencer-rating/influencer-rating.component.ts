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
      authenticity: ['', Validators.required],
      engagement: ['', Validators.required],
      transparency: ['', Validators.required],
      relevance: ['', Validators.required],
      consistency: ['', Validators.required],
      creativity: ['', Validators.required],
      influence: ['', Validators.required],
      trustworthiness: ['', Validators.required],
      responsiveness: ['', Validators.required],
      personality: ['', Validators.required],
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

  handleClickAuthenticity(index : number) {
    this.influencerForm.controls['authenticity'].setValue(index);
  }

  handleClickEngagement(index : number) {
    this.influencerForm.controls['engagement'].setValue(index);
  }
  handleClickTransparency(index : number) {
    this.influencerForm.controls['transparency'].setValue(index);
  }

  handleClickRelevance(index : number) {
    this.influencerForm.controls['relevance'].setValue(index);
  }

  handleClickConsistency(index : number) {
    this.influencerForm.controls['consistency'].setValue(index);
  }

  handleClickCreativity(index : number) {
    this.influencerForm.controls['creativity'].setValue(index);
  }

  handleClickInfluence(index : number) {
    this.influencerForm.controls['influence'].setValue(index);
  }

  handleClickTrustworthiness(index : number) {
    this.influencerForm.controls['trustworthiness'].setValue(index);
  }

  handleClickResponsiveness(index : number) {
    this.influencerForm.controls['responsiveness'].setValue(index);
  }

  handleClickPersonality(index : number) {
    this.influencerForm.controls['personality'].setValue(index);
  }







}
