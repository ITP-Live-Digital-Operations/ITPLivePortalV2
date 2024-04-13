import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserstatsService } from 'src/app/core/Services/userstats.service';
import { userCountModel } from 'src/app/core/interfaces/userStats.model';

@Component({
  selector: 'app-userstats',
  templateUrl: './userstats.component.html',
  styleUrls: ['./userstats.component.scss']
})
export class UserstatsComponent implements OnInit {
  uploadedBriefsDataSource: MatTableDataSource<userCountModel>;
  addedCelebritiesDataSource: MatTableDataSource<userCountModel>;
  addedClientsByUserDataSource:MatTableDataSource<userCountModel>;
  countAddedFilesByUserDataSource:MatTableDataSource<userCountModel>;
  countAddedInfluencersByUser:MatTableDataSource<userCountModel>;
  countAddedLogsByUser:MatTableDataSource<userCountModel>;
  countTalentTasks:MatTableDataSource<userCountModel>;
  displayedColumns: string[] = ['name', 'count'];

  constructor(private userStatsService: UserstatsService) {
    this.uploadedBriefsDataSource = new MatTableDataSource<userCountModel>([]);
    this.addedCelebritiesDataSource = new MatTableDataSource<userCountModel>([]);
    this.addedClientsByUserDataSource =  new MatTableDataSource<userCountModel>([]);
    this.countAddedFilesByUserDataSource = new MatTableDataSource<userCountModel>([]);
    this.countAddedInfluencersByUser = new MatTableDataSource<userCountModel>([]);
    this.countAddedLogsByUser = new MatTableDataSource<userCountModel>([]);
    this.countTalentTasks =new MatTableDataSource<userCountModel>([]);
  }

  ngOnInit(): void {
    this.fetchUploadedBriefsData();
    this.fetchAddedCelebritiesData();
    this.fetchAddedClientsByUserData();
    this.fetchcountAddedFilesByUserData();
    this.fetchcountAddedInfluencersByUserData();
    this.fetchcountTalentTasksData();
    this.fetccountAddedLogsByUserhData();
  }

  fetchUploadedBriefsData(): void {
    this.userStatsService.countUploadedBriefsByUser().subscribe(
      (data: userCountModel[]) => {
   
        this.uploadedBriefsDataSource = new MatTableDataSource<userCountModel>(data);
      },
      (error) => {
        console.error('Error fetching uploaded briefs data: ', error);
      }
    );
  }

  fetchAddedCelebritiesData(): void {
    this.userStatsService.countAddedCelebritiesByUser().subscribe(
      (data: userCountModel[]) => {
     
        this.addedCelebritiesDataSource = new MatTableDataSource<userCountModel>(data);
      },
      (error) => {
        console.error('Error fetching added celebrities data: ', error);
      }
    );
  }
fetchAddedClientsByUserData(): void {

  this.userStatsService.countAddedClientsByUser().subscribe(

    (data: userCountModel[]) => {
  
      this.addedClientsByUserDataSource = new MatTableDataSource<userCountModel>(data);
    },
    (error) => {
      console.error('Error fetching added celebrities data: ', error);
    }

  );
}

fetchcountAddedFilesByUserData():void{

  this.userStatsService.countAddedFilesByUser().subscribe(
    (data: userCountModel[]) => {

      this.countAddedFilesByUserDataSource = new MatTableDataSource<userCountModel>(data);
    },
    (error) => {
      console.error('Error fetching added celebrities data: ', error);
    }

  );
}
  
fetchcountAddedInfluencersByUserData():void{
this.userStatsService.countAddedInfluencersByUser().subscribe(



   (data: userCountModel[]) => {

      this.countAddedInfluencersByUser = new MatTableDataSource<userCountModel>(data);
    },
    (error) => {
      console.error('Error fetching added celebrities data: ', error);
    }

  );
}


fetccountAddedLogsByUserhData():void{
this.userStatsService.countAddedLogsByUser().subscribe(
  (data: userCountModel[]) => {

    this.countAddedLogsByUser = new MatTableDataSource<userCountModel>(data);
  },
  (error) => {
    console.error('Error fetching added celebrities data: ', error);
  }

);

}


fetchcountTalentTasksData():void{
  this.userStatsService.countTalentTasks().subscribe(

    (data: userCountModel[]) => {

      this.countTalentTasks = new MatTableDataSource<userCountModel>(data);
    },
    (error) => {
      console.error('Error fetching added celebrities data: ', error);
    }
  
  );
}

}
