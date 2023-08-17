import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CelebrityService } from 'src/app/core/services/celebrity.service';

@Component({
  selector: 'app-celebrity-id',
  templateUrl: './celebrity-id.component.html',
  styleUrls: ['./celebrity-id.component.scss'],
})
export class CelebrityIdComponent {
  id: number = 0;
  celebrityData: any;
  isReviewVisible: boolean = false;

  constructor(
    private service: CelebrityService,
    @Inject(MAT_DIALOG_DATA) public source: any
  ) {}

  ngOnInit() {
    this.GetCelebrityData(this.source.id);
  }

  GetCelebrityData(inputdata: any) {
    return this.service.getCelebrity(inputdata).subscribe((item) => {
      this.celebrityData = item;
    });
  }
}
