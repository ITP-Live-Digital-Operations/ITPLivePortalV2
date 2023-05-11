import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/core/Services/file.service';
import { SalesService } from 'src/app/core/Services/sales.service';

@Component({
  selector: 'app-view-brief-files',
  templateUrl: './view-brief-files.component.html',
  styleUrls: ['./view-brief-files.component.css']
})
export class ViewBriefFilesComponent implements OnInit {

    brief_id: any;
    brief: any;
    budgetSheetId: any;
    presentationId: any;

    budgetSheet: any;
    presentation: any;



    constructor(private activatedRoute: ActivatedRoute, private fileService : FileService, private salesService : SalesService) { }

    ngOnInit(): void {
      this.loadFiles();
    }

    loadFiles(){
        this.activatedRoute.params.subscribe(params => {
          this.brief_id = params['id'];
          this.salesService.getSalesBrief(this.brief_id).subscribe((res:any)=>{
            this.brief = res.data
              console.log(this.brief);
            this.budgetSheetId = this.brief.BudgetSheetId;

            this.getBudgetSheet(this.budgetSheetId);

            this.presentationId = this.brief.PresentationId;

            this.getPresentation(this.presentationId);
          })

        });
    }

    getBudgetSheet(id: number){
      this.fileService.getFile(id).subscribe((data: any) => {

          this.budgetSheet = data.data;
      });
    }

    getPresentation(id: number){
      this.fileService.getFile(id).subscribe((data: any) => {

          this.presentation = data.data;
      });
    }

    downloadFilePPTX(id: number, filename: string){
      this.fileService.downloadFile(id, filename).subscribe((data: any) => {

      });
    }

    downloadFilexlsx(id: number, filename: string){
      this.fileService.downloadFile(id, filename).subscribe((data: any) => {

      });
    }

    backButton(){
      window.history.back();
    }
}
