import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InfluencerIdsAndNames } from 'src/app/core/interfaces/influencersModel';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-influecers-to-campaign',
  templateUrl: './add-influecers-to-campaign.component.html',
  styleUrls: ['./add-influecers-to-campaign.component.scss'],
})
export class AddInfluecersToCampaignComponent {
  protected influencers!: InfluencerIdsAndNames[];
  protected dataSource: any;

  protected selectedInfluencers: { id: number; name: string }[] = [];
  protected selectedInfluencerIds: number[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  protected displayedColumns: string[] = ['name', 'select'];

  protected searchInputChanged: Subject<string> = new Subject<string>();
  protected searchTerm: string = '';
  protected campaignId!: number;
  protected hasInfluencers: boolean = false;

  constructor(
    private influencerService: InfluencerService,
    private campaignService: CampaignService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddInfluecersToCampaignComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) protected source: any
  ) {}

  ngOnInit(): void {
    this.loadInfluencers();

    this.searchInputChanged
      .pipe(
        debounceTime(300) // Adjust the debounce time as needed
      )
      .subscribe((model) => {
        this.applyFilter(model);
      });


  }

  loadInfluencers() {
    this.influencerService
      .getInfluencerIdsandNames()
      .subscribe((data: InfluencerIdsAndNames[]) => {
        this.influencers = data;

        this.dataSource = new MatTableDataSource(this.influencers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.campaignId = this.source.campaignId;
      this.campaignService.getCampaignInfluencers(this.campaignId).subscribe((data: any) => {
        console.log(data);
        if( data.Influencers.length > 0) {
          this.hasInfluencers = true;
          for( let i = 0; i < data.Influencers.length; i++) {
            this.selectedInfluencers.push({id: data.Influencers[i].id, name: data.Influencers[i].Name});
          }
        }
        console.log(this.hasInfluencers);
      })
  }

  onSearchInputChanged(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.searchInputChanged.next(inputElement.value);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.applyFilter('');
  }

  isInfluencerSelected(influencerId: number): boolean {
    return this.selectedInfluencers.some(
      (influencer) => influencer.id === influencerId
    );
  }

  addInfluencer(influencerId: number, influencerName: string) {
    const influencerExists = this.selectedInfluencers.some(
      (influencer) => influencer.id === influencerId
    );

    if (!influencerExists) {
      this.selectedInfluencers.push({ id: influencerId, name: influencerName });
    }
  }

  deleteInfluencer(influencerId: number) {
    this.selectedInfluencers = this.selectedInfluencers.filter(
      (influencer) => influencer.id !== influencerId
    );
  }

  addtoCampaign() {
    this.selectedInfluencers.forEach((influencer) => {
      this.selectedInfluencerIds.push(influencer.id);
    });
    console.log(this.selectedInfluencerIds);

    this.campaignService
      .addInfluencersToCampaign(this.campaignId, {
        influencers: this.selectedInfluencerIds,
      })
      .subscribe(
        (data: any) => {
          if (data.status === 'success')  {
            this.toastr.success('Influencers added to campaign successfully');
            this.dialog.closeAll();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  editInfluencers() {
    this.selectedInfluencers.forEach((influencer) => {
      this.selectedInfluencerIds.push(influencer.id);
    });
    console.log(this.selectedInfluencerIds);

    this.campaignService
      .editCampaignInfluencers(this.campaignId, {
        influencers: this.selectedInfluencerIds,
      })
      .subscribe(
        (data: any) => {
          if (data.status === 'success')  {
            this.toastr.success('Influencers edited successfully');
            this.dialog.closeAll();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
