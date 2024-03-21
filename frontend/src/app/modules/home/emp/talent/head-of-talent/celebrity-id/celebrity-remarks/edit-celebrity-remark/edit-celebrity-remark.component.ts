import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CelebrityService } from 'src/app/core/services/celebrity.service';

@Component({
  selector: 'app-edit-celebrity-remark',
  templateUrl: './edit-celebrity-remark.component.html',
  styleUrls: ['./edit-celebrity-remark.component.scss']
})
export class EditCelebrityRemarkComponent {
  remarkId!: number;
  remark: any;
  form!: FormGroup;


  constructor(
    private toastr: ToastrService,
    private celebrityService: CelebrityService,
    private dialogRef: MatDialogRef<EditCelebrityRemarkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      note: new FormControl('', Validators.required),
    });
  }


  ngOnInit(): void {
    this.remarkId = this.data.id;
    this.celebrityService.getCelebrityRemarkById(this.remarkId).subscribe((data) => {
      console.log(data);
      this.remark = data;
      this.form.patchValue({
        note: this.remark.note,
      });
    });
  }


  onSubmit(): void {
    console.log(this.form.value.note)
    this.celebrityService.updateCelebrityRemark(this.remarkId, this.form.value.note).subscribe((data) => {
      if (data.status === 'success') {
        this.toastr.success(data.message);
        this.dialogRef.close();
      } else {
        this.toastr.error(data.message);
      }
    });
  }
}
