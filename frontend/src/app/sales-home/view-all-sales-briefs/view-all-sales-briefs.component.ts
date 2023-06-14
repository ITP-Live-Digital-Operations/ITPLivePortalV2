import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-view-all-sales-briefs',
  templateUrl: './view-all-sales-briefs.component.html',
  styleUrls: ['./view-all-sales-briefs.component.css']
})
export class ViewAllSalesBriefsComponent implements OnInit {

  briefDetails: any;
  dataSource: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort) sort !: MatSort;

 constructor(private salesService : SalesService, private route : Router){}

  ngOnInit(): void {
    this.getAllBriefs();
  }


drop(event: CdkDragDrop<string[]>) {

  moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);

  // Recompute priorities for all items
  const updatedPriorities = this.dataSource.data.map((item: any, index: any) => {
    // We add 1 because array indices are zero-based, but your priorities are one-based
    return { id: item.id, newPriority: index + 1 };
  });

 console.log(updatedPriorities)
 this.salesService.updatePriorities(updatedPriorities).subscribe(
  response => {
    // Handle the response from the server
    setTimeout(() => {
      window.location.reload();
    }, 200);

    // You can refresh the table or show a notification to the user here
  },
  error => {
    // Handle any errors from the server
    console.error('Error updating priorities:', error);
  }
);
}

  getAllBriefs(){
    this.salesService.getAllBriefs().subscribe((data:any)=>{

      this.briefDetails = data;
      this.briefDetails.data.sort((a :any, b : any) => a.Priority - b.Priority);
      this.dataSource = new MatTableDataSource(this.briefDetails.data);


   
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

  })
  }



  displayedColumns: string[] =  [ 'CampaignName','Agency', 'Client','CampaignStartDate', 'CampaignObjective', 'Priority' , 'createdBy', 'Action'];

  onRowClicked(row: any) {
    this.viewedTask(row.id);
  }

  viewedTask(id: any){
    this.salesService.viewedByTalent(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.route.navigate([`home/sales/sentBrief/${id}`]);
  }


  backButton() {
    window.history.back();
  }


}

