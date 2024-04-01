import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CelebrityService } from 'src/app/core/services/celebrity.service';

@Component({
  selector: 'app-celebrity-id',
  templateUrl: './celebrity-id.component.html',
  styleUrls: ['./celebrity-id.component.scss'],
})
export class CelebrityIdComponent {
  public selectedComponent !: string;
  public id: number = 0;
  public celebrityData: any;
  public isReviewVisible: boolean = false;
  

  constructor(
    private service: CelebrityService,
    @Inject(MAT_DIALOG_DATA) public source: any,
    private dialogRef: MatDialogRef<CelebrityIdComponent>
  ) {}

  ngOnInit() {
    this.GetCelebrityData(this.source.id);
  }

  private GetCelebrityData(inputdata: any): void {
    this.service.getCelebrity(inputdata).subscribe((item) => {
      this.celebrityData = item;
    });
  }
  selectComponent(component: string) {
    this.selectedComponent = component;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
