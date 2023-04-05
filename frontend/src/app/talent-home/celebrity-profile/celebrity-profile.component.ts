import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CelebrityService } from 'src/app/core/Services/celebrity.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-celebrity-profile',
  templateUrl: './celebrity-profile.component.html',
  styleUrls: ['./celebrity-profile.component.css']
})
export class CelebrityProfileComponent implements OnInit{
  id: any;
  celebrityData : any;

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private service: CelebrityService){}

  ngOnInit(){
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']
      this.GetCelebrityData(this.id)

    })
  }

  GetCelebrityData(inputdata: any) {
    return this.service.getCelebrity(inputdata).subscribe((item) => {
        this.celebrityData = item;

    })}

  backButton() {
    window.history.back();
  }
}
