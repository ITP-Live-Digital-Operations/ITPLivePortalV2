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
  assignForm: FormGroup;
  progressForm: FormGroup;
  public influencersForm: FormGroup;
  public influencers: InfluencerModel[] = [];
  platforms = ['Instagram', 'Tiktok', 'Snapchat', 'Twitter', 'Facebook', 'Youtube'];
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

  get rows(): FormArray {
    return this.influencersForm.get('rows') as FormArray;
  }

  addRow(influencer: InfluencerModel): void {
    const row = this.formBuilder.group({
      id: [influencer.id],
      name: [influencer.Name],
      platform: [''],
      socialLink: [''],
      followers: [''],
      deliverables: [''],
      estimatedBudget: [''],
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
      } else {
        console.error('Influencer object does not have InstagramLink or InstagramFollowers properties.');
      }
    }

    if (chosenPlatform === 'Tiktok') {
      const TiktokLink = this.influencers[i].TiktokLink;
      const TiktokFollowers = this.influencers[i].TiktokFollowers;

      // Ensure these properties exist on the influencer object
      if (TiktokLink && TiktokFollowers) {
        row.get('socialLink')?.setValue(TiktokLink);
        row.get('followers')?.setValue(TiktokFollowers);
      } else {
        console.error('Influencer object does not have InstagramLink or InstagramFollowers properties.');
      }
    }

    if (chosenPlatform === 'Snapchat') {
      const SnapchatLink = this.influencers[i].SnapchatLink;
      const SnapchatFollowers = this.influencers[i].SnapchatFollowers;

      // Ensure these properties exist on the influencer object
      if (SnapchatLink && SnapchatFollowers) {
        row.get('socialLink')?.setValue(SnapchatLink);
        row.get('followers')?.setValue(SnapchatFollowers);
      } else {
        console.error('Influencer object does not have InstagramLink or InstagramFollowers properties.');
      }
    }

    if (chosenPlatform === 'Twitter') {
      const TwitterLink = this.influencers[i].TwitterLink;
      const TwitterFollowers = this.influencers[i].TwitterFollowers;

      // Ensure these properties exist on the influencer object
      if (TwitterLink && TwitterFollowers) {
        row.get('socialLink')?.setValue(TwitterLink);
        row.get('followers')?.setValue(TwitterFollowers);
      } else {
        console.error('Influencer object does not have InstagramLink or InstagramFollowers properties.');
      }
    }

    if (chosenPlatform === 'Facebook') {
      const FacebookLink = this.influencers[i].FacebookLink;
      const FacebookFollowers = this.influencers[i].FacebookFollowers;

      // Ensure these properties exist on the influencer object
      if (FacebookLink && FacebookFollowers) {
        row.get('socialLink')?.setValue(FacebookLink);
        row.get('followers')?.setValue(FacebookFollowers);
      } else {
        console.error('Influencer object does not have InstagramLink or InstagramFollowers properties.');
      }
    }

    if (chosenPlatform === 'Youtube') {
      const YoutubeLink = this.influencers[i].YoutubeLink;
      const YoutubeFollowers = this.influencers[i].YoutubeFollowers;

      // Ensure these properties exist on the influencer object
      if (YoutubeLink && YoutubeFollowers) {
        row.get('socialLink')?.setValue(YoutubeLink);
        row.get('followers')?.setValue(YoutubeFollowers);
      } else {
        console.error('Influencer object does not have InstagramLink or InstagramFollowers properties.');
      }
    }
    




  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }

  ngOnInit(): void {
    this.loadBriefData();
    this.refresh();
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

          this.getBudgetSheet(this.budgetSheetId);

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
