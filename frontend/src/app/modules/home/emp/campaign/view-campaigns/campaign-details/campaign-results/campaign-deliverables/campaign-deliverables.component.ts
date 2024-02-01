import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfluencerService } from 'src/app/core/services/influencer.service';



@Component({
  selector: 'app-campaign-deliverables',
  templateUrl: './campaign-deliverables.component.html',
  styleUrls: ['./campaign-deliverables.component.scss']
})
export class CampaignDeliverablesComponent {
  @Input()
  platformDeliverable!: string;

  @Input()
  schema!: any[];

  @Input()
  campaignId!: number;

  @Input()
  influencerId!: number;

  @Input()
  poc!: string;

  @Output() done: EventEmitter<void> = new EventEmitter<void>();

  public form!: FormGroup;

  labels: string[] = [];
  keysAndTypes: any[] = [];
  public get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
    private influencerService : InfluencerService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'] && changes['schema'].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    if (this.schema && this.schema.length > 0) {
      this.labels = this.schema.map(column => column.label);
      this.keysAndTypes = this.schema.map(column => ({ key: column.key, type: column.type }));

      this.form = this.formBuilder.group({
        rows: this.formBuilder.array([])
      });
      this.addRow();
    }
  }

  public addRow(): void {
    const row = this.formBuilder.group({});
    this.keysAndTypes.forEach(keyAndType => {
      row.addControl(keyAndType.key, this.formBuilder.control('',Validators.pattern('^[0-9]*$')));
    });
    this.rows.push(row);
  }

  public deleteRow(index: number): void {
    this.rows.removeAt(index);
  }

  public save(): void {
    console.log(this.platformDeliverable);
    console.log(this.campaignId)
    console.log(this.influencerId)
    console.log(this.form.value);


    this.influencerService.addInfluencerStats(this.campaignId, this.influencerId,  this.poc, this.platformDeliverable, this.form.value).subscribe(
      (res) => {
        console.log(res);
        this.done.emit();
      },
      (err) => {
        console.log(err);
      }
    );


  }


}
