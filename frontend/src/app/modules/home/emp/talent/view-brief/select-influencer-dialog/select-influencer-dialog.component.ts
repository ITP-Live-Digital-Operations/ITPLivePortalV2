import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InfluencerModel } from 'src/app/core/interfaces/influencersModel';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-select-influencer-dialog',
  templateUrl: './select-influencer-dialog.component.html',
  styleUrls: ['./select-influencer-dialog.component.scss'],
})
export class SelectInfluencerDialogComponent {

  private influencers: InfluencerModel[] = [];
  public myControl = new FormControl();
  public filteredInfluencers: Observable<InfluencerModel[]> | undefined;

  constructor(
    public dialogRef: MatDialogRef<SelectInfluencerDialogComponent>,
    private influencerService: InfluencerService
  ) {
    this.influencerService.getInfluencers().subscribe((data: any) => {
      this.influencers = data.sort((a: any, b: any) =>
        a.Name.localeCompare(b.Name)
      );
      this.filteredInfluencers = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) => (name ? this._filter(name) : this.influencers.slice()))
      );
    });
  }

  public displayFn(influencer: InfluencerModel): string {
    return influencer && influencer.Name ? influencer.Name : '';
  }

  private _filter(name: string): InfluencerModel[] {
    const filterValue = name.toLowerCase();
    return this.influencers.filter((influencer) =>
      influencer.Name.toLowerCase().includes(filterValue)
    );
  }

  public onSelect(influencer: InfluencerModel): void {
    this.dialogRef.close(influencer);
  }
}
