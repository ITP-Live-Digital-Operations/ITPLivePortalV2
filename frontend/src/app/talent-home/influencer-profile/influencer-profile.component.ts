
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { LogService } from 'src/app/core/Services/log.service';
import { InfluencerService } from 'src/app/core/Services/influencer.service';
import { LogModel } from 'src/app/Models/LogModel';
import * as alertify from 'alertifyjs';
import { ModalpopupComponent } from '../modalpopup/modalpopup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-influencer-profile',
  templateUrl: './influencer-profile.component.html',
  styleUrls: ['./influencer-profile.component.css']
})
export class InfluencerProfileComponent implements OnInit{
  id: any;
  influencerData : any;

  dataSource: any;
  UserDetails: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort !: MatSort;

  constructor(private route: Router,private logService : LogService, private activatedRoute: ActivatedRoute, private service: InfluencerService, private dialog: MatDialog){}

  ngOnInit(){
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']
      this.GetInfluencerData(this.id)
      this.GetLogs(this.id)

    })
  }

  GetInfluencerData(inputdata: any) {
    return this.service.getInfluencer(inputdata).subscribe((item) => {
        this.influencerData = item;

    })}

  backButton() {
    /* this.route.navigate(['home/talent/forms']) */
    window.history.back();
  }

  GetLogs(id:any) {
    try{
    this.logService.getInfluencerLogs(id).subscribe((item) => {


      this.UserDetails = item;
      this.dataSource = new MatTableDataSource<LogModel>(this.UserDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })}
    catch{
      alertify.error('No logs found')
    }
  }


  redirectToNewLog(id:any, name:any){
    const data ={id: id, name: name}

    sessionStorage.setItem('influencerData', JSON.stringify(data));

    this.route.navigate(['home/talent/newLog'])
  }

  editInfluencer(inputdata:any){
    this.dialog.open(ModalpopupComponent, {
      width: '80%',
      height: '70%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data:{
        id: inputdata
      }
    })
  }

  rateInfluencer(inputdata:any){
    this.route.navigate([`home/talent/influencer-rating/${inputdata}`])
  }

  displayedColumns: string[] = ['Influencer', 'Campaign', 'Platform', 'Deliverable', 'Currency', 'Rate', 'Contact', 'Time_to_reply', 'Date'];
}
