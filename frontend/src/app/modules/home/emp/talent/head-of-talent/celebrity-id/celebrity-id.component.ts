import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CelebrityService } from 'src/app/core/services/celebrity.service';

@Component({
  selector: 'app-celebrity-id',
  templateUrl: './celebrity-id.component.html',
  styleUrls: ['./celebrity-id.component.scss'],
})
export class CelebrityIdComponent {

  public id: number = 0;
  public celebrityData: any;
  public isReviewVisible: boolean = false;

  constructor(
    private service: CelebrityService,
    @Inject(MAT_DIALOG_DATA) public source: any
  ) {}

  ngOnInit() {
    this.GetCelebrityData(this.source.id);
  }

  private GetCelebrityData(inputdata: any): void {
    this.service.getCelebrity(inputdata).subscribe((item) => {
      this.celebrityData = item;
    });
  }
}
