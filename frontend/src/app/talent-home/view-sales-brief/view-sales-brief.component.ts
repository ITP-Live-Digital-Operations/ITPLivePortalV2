import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { TaskService } from 'src/app/core/Services/task.service';
import { UserService } from 'src/app/core/Services/user.service';
import * as alertify from 'alertifyjs';
import { Location } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FileService } from 'src/app/core/Services/file.service';
import { InfluencerModel } from 'src/app/Models/InfluencerModel';
import { MatDialog } from '@angular/material/dialog';
import { SelectInfluencerDialogComponent } from '../select-influencer-dialog/select-influencer-dialog.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-view-sales-brief',
  templateUrl: './view-sales-brief.component.html',
  styleUrls: ['./view-sales-brief.component.css'],
})
export class ViewSalesBriefComponent implements OnInit {
  dataSource: any;

  brief: any;
  id: any;

  task: any;

  salesperson: any;

  budgetSheetId: any;
  budgetSheet: any;
  presentationId: any;
  presentation: any;

  budgetApproved = false;
  budgetNotes = '';

  presentationApproved = false;
  presentationNotes = '';

  assignedUser: any;

  user_id = this.userService.getID();
  role = this.userService.getRole();
  privilege_level = this.userService.getPrivilegeLevel();

  budgetdata: any;
  assignForm: FormGroup;
  progressForm: FormGroup;
  public influencersForm: FormGroup;
  influencers: InfluencerModel[] = [];

  platforms : any
  currencies : any
  constructor(
    private fileService: FileService,
    public dialog: MatDialog,
    private salesService: SalesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private taskService: TaskService,
    private location: Location
  ) {

    this.assignForm = this.formBuilder.group({
      Weight: ['', Validators.required],
    });

    this.progressForm = this.formBuilder.group({
      Progress: ['', Validators.required],
    });

    this.influencersForm = this.formBuilder.group({
      rows: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.loadBriefData();
    this.refresh();

     this.platforms = ['Instagram', 'Tiktok', 'Snapchat', 'Twitter', 'Facebook', 'Youtube'];
    this.currencies = ['SAR', 'AED']



  }

  get rows(): FormArray {
    return this.influencersForm.get('rows') as FormArray;
  }

  addRow(influencer: any): void {
    const row = this.formBuilder.group({
      nb: [this.influencers.length + 1],
      name: [influencer.Name],
      platform: [influencer.platform],
      socialLink: [influencer.socialLink],
      followers: [influencer.followers],
      deliverables: [influencer.deliverables],
      currency: [influencer.currency],
      estimatedBudget: [influencer.estimatedBudget],
    });
    this.rows.push(row);
    this.influencers.push(influencer);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectInfluencerDialogComponent);

    dialogRef.afterClosed().subscribe((selectedInfluencer: InfluencerModel) => {
      if (selectedInfluencer) {
        this.addRow(selectedInfluencer);
      }
    });
  }

  updateFields(i: number, event: any): void {

    const chosenPlatform = event.target.value;
    const row = this.rows.at(i) as FormGroup;

    if (i >= this.influencers.length || !this.influencers[i]) {
      console.error('No influencer exists at this index.');
      return;
    }

    if (chosenPlatform === 'Instagram') {
      const instagramLink = this.influencers[i].InstagramLink;
      const instagramFollowers = this.influencers[i].InstagramFollowers;

      // Ensure these properties exist on the influencer object
      if (instagramLink && instagramFollowers) {
        row.get('socialLink')?.setValue(instagramLink);
        row.get('followers')?.setValue(instagramFollowers);
      }
    }

    if (chosenPlatform === 'Tiktok') {
      const TiktokLink = this.influencers[i].TiktokLink;
      const TiktokFollowers = this.influencers[i].TiktokFollowers;

      // Ensure these properties exist on the influencer object
      if (TiktokLink && TiktokFollowers) {
        row.get('socialLink')?.setValue(TiktokLink);
        row.get('followers')?.setValue(TiktokFollowers);
      }
    }

    if (chosenPlatform === 'Snapchat') {
      const SnapchatLink = this.influencers[i].SnapchatLink;
      const SnapchatFollowers = this.influencers[i].SnapchatFollowers;

      // Ensure these properties exist on the influencer object
      if (SnapchatLink && SnapchatFollowers) {
        row.get('socialLink')?.setValue(SnapchatLink);
        row.get('followers')?.setValue(SnapchatFollowers);
      }
    }

    if (chosenPlatform === 'Twitter') {
      const TwitterLink = this.influencers[i].TwitterLink;
      const TwitterFollowers = this.influencers[i].TwitterFollowers;

      // Ensure these properties exist on the influencer object
      if (TwitterLink && TwitterFollowers) {
        row.get('socialLink')?.setValue(TwitterLink);
        row.get('followers')?.setValue(TwitterFollowers);
      }
    }

    if (chosenPlatform === 'Facebook') {
      const FacebookLink = this.influencers[i].FacebookLink;
      const FacebookFollowers = this.influencers[i].FacebookFollowers;

      // Ensure these properties exist on the influencer object
      if (FacebookLink && FacebookFollowers) {
        row.get('socialLink')?.setValue(FacebookLink);
        row.get('followers')?.setValue(FacebookFollowers);
      }
    }

    if (chosenPlatform === 'Youtube') {
      const YoutubeLink = this.influencers[i].YoutubeLink;
      const YoutubeFollowers = this.influencers[i].YoutubeFollowers;

      // Ensure these properties exist on the influencer object
      if (YoutubeLink && YoutubeFollowers) {
        row.get('socialLink')?.setValue(YoutubeLink);
        row.get('followers')?.setValue(YoutubeFollowers);
      }
    }

  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }

  submitTable(){
    let tableData: any[] = [];

    this.influencersForm.value.rows.forEach(((rowGroup: any) => {
      tableData.push(rowGroup);
    }));
    console.log("Table Data: ", tableData);

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tableData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const data: Blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Create a File object from the Blob
    const fileName = this.brief.data.CampaignName +"- BudgetSheet" + new Date().getTime() + '.xlsx';
    const fileTable: File = new File([data], fileName);

    saveAs(fileTable);


    // Now upload the file
    this.fileService.uploadFile( fileTable , this.brief.data.id, this.user_id).subscribe(
        (data) => {
            alertify.success('Excel file created and uploaded successfully');
            window.location.reload();
        },
        (error) => {
            alertify.error('Excel file creation and upload error');
        }
    );


  }







  loadBriefData() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.salesService
        .getSalesBriefWithFiles(this.id)
        .subscribe((data: any) => {
          this.brief = data;

          this.getTask(this.brief.data.id);

          this.getSalesPerson(this.brief.data.CreatedbyID);
          this.budgetSheetId = data.data.BudgetSheetId;

          if (this.budgetSheetId){
          this.getBudgetSheet(this.budgetSheetId);

          }
          this.presentationId = data.data.PresentationId;
          this.getPresentation(this.presentationId);
        });
    });
  }

  getSalesPerson(id: number) {
    this.userService.getUserNameById(id).subscribe((data: any) => {
      this.salesperson = data.name;
    });
  }

  getTask(id: number) {
    this.taskService.getTaskByBriefId(id).subscribe((data: any) => {
      this.task = data.data[0];
      console.log(this.task);

      this.progressForm.setControl('Progress', new FormControl(this.task.progress));
      this.userService
        .getUserNameById(this.task.assigned_to)
        .subscribe((data: any) => {
          this.assignedUser = data.name;
        });
    });
  }

  backButton() {
    window.history.back();
  }

  refresh(): void {
    const refreshFlag = localStorage.getItem('refreshed-after-sales-brief');

    if (!refreshFlag) {
      localStorage.setItem('refreshed-after-sales-brief', 'true');
      this.location.go(this.location.path());
      window.location.reload();
    }
  }

  fileToUpload: File | null = null;

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileToUpload = files.item(0);
  }

  uploadFileXlsx(): void {
    if (this.fileToUpload?.type != 'sheet') {
      if (this.fileToUpload) {
        this.fileService
          .uploadFile(this.fileToUpload, this.brief.data.id, this.user_id)
          .subscribe(
            (data) => {
              alertify.success('File uploaded successfully');
              window.location.reload();
            },
            (error) => {
              alertify.error('File upload error');
            }
          );
      }
    } else {
      alertify.error('Wrong file type');
    }
  }

  uploadFilePPTX(): void {
    if (this.fileToUpload?.type != 'presentation') {
      if (this.fileToUpload) {
        this.fileService
          .uploadFile(this.fileToUpload, this.brief.data.id, this.user_id)
          .subscribe(
            (data) => {
              alertify.success('File uploaded successfully');
              window.location.reload();
            },
            (error) => {
              alertify.error('File upload error');
            }
          );
      }
    } else {
      alertify.error('Wrong file type');
    }
  }

  downloadFilePPTX(id: number, filename: string) {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      /* const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
      const url = window.URL.createObjectURL(blob);
      window.open(url); */
    });
  }

  downloadFilexlsx(id: number, filename: string) {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      /*  const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      window.open(url); */
    });
  }

  getBudgetSheet(id: number) {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.budgetSheet = data.data;
      this.budgetApproved = this.budgetSheet.approved;
      this.budgetNotes = this.budgetSheet.notes;

      this.fileService.getFilesById(id).subscribe((data: any) => {
        const excelFile = data
        const workbook = XLSX.read(new Uint8Array(excelFile), {type: 'array'});
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        this.budgetdata = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        console.log(this.budgetdata);
        for(let i = 1; i < this.budgetdata.length; i++) {
          let influencer = {
            id: this.budgetdata[i][0],
            Name: this.budgetdata[i][1],
            platform: this.budgetdata[i][2],
            socialLink: this.budgetdata[i][3],
            followers: this.budgetdata[i][4],
            deliverables: this.budgetdata[i][5],
            currency: this.budgetdata[i][6],
            estimatedBudget: this.budgetdata[i][7],
          };
          this.addRow(influencer);
        }



      })

    });
  }

  getPresentation(id: number) {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.presentation = data.data;
      this.presentationApproved = this.presentation.approved;
      this.presentationNotes = this.presentation.notes;
    });
  }

  salesBriefReady() {
    this.salesService.salesBriefReady(this.id).subscribe((data: any) => {
      if (data.status == 'success') {
        alertify.success('Sales Brief is ready');
      } else {
        alertify.error('Error');
      }
    });

    this.taskService
      .updateStatusToComplete(this.task.id)
      .subscribe((data: any) => {
        if (data) {
          alertify.success('Task is completed');
        } else {
          alertify.error('Error');
        }
      });
  }

  submitProgress() {

    console.log("progress", this.progressForm.value.Progress);

    this.taskService.updateProgress(this.task.id, { progress :this.progressForm.value.Progress}).subscribe((data: any) => {});
    window.location.reload();
  }
}
