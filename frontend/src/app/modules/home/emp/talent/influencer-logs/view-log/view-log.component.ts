import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogModel } from 'src/app/core/interfaces/logModel';
import { LogService } from 'src/app/core/services/log.service';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.component.html',
  styleUrls: ['./view-log.component.scss']
})
export class ViewLogComponent {
  public id: number = this.source.id;
  public type: String = this.source.type;
  public package : boolean = false;
  public single : boolean = false;
  public log !: LogModel;

  displayedColumnsSingle: string[] = ['platform', 'deliverable', 'quantity', 'currency', 'rate'];

  displayedColumnsForPackages: string[] = ['platform', 'deliverable', 'quantity'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public source: any,
    public logService : LogService,
  ) {


  }
  ngAfterViewInit() {

    this.logService.getLogById(this.id).subscribe(data => {
      this.log = data;

      if(this.type == 'single'){
        this.single = true;
      }
      else if(this.type == 'package'){
        this.package = true;
      }

    })

  }




}
