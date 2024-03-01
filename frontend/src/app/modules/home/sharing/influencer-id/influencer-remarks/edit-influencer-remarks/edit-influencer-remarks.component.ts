import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InfluencerService } from 'src/app/core/services/influencer.service';

@Component({
  selector: 'app-edit-influencer-remarks',
  templateUrl: './edit-influencer-remarks.component.html',
  styleUrls: ['./edit-influencer-remarks.component.scss']
})
export class EditInfluencerRemarksComponent {

  remarkId!: number;
  remark: any;
  form!: FormGroup;



  constructor(
    private toastr: ToastrService,
    private influencerService: InfluencerService,
    private dialogRef: MatDialogRef<EditInfluencerRemarksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ){
    this.form = new FormGroup({
      note: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {

      this.remarkId = this.data.id;
      this.influencerService.getInfluencerRemarkById(this.remarkId).subscribe((item) => {
        this.remark = item;
        this.form.patchValue({

          note: this.remark.note,
        });

    });
  }
  onSubmit(): void {
    console.log(this.form.value);
    this.influencerService.updateInfluencerRemark(this.remarkId, this.form.value).subscribe((item) => {
      if(item.status === 'success'){
        this.dialogRef.close();
      this.toastr.success('' + item.message);
      }
    });
  }
}
