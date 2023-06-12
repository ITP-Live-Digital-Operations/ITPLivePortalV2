import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { LogModel } from 'src/app/Models/LogModel';
import { InfluencerService } from 'src/app/core/Services/influencer.service';
import { LogService } from 'src/app/core/Services/log.service';
import { ModalpopupComponent } from 'src/app/talent-home/modalpopup/modalpopup.component';
import * as alertify from 'alertifyjs'
@Component({
  selector: 'app-sales-influencers',
  templateUrl: './sales-influencers.component.html',
  styleUrls: ['./sales-influencers.component.css']
})
export class SalesInfluencersComponent implements OnInit{
  id: any;
  influencerData : any;
  influencerRating: any;
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
      this.GetInfluencerRating(this.id)

    })
  }

  GetInfluencerData(inputdata: any) {
    return this.service.getInfluencer(inputdata).subscribe((item) => {
        this.influencerData = item;

    })}

  GetInfluencerRating(inputdata: any) {
    return this.service.getAverageInfluencerRating(inputdata).subscribe((item) => {
        this.influencerRating = item;
    })
  }

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

