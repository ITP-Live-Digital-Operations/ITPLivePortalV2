import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CelebrityIdandName } from 'src/app/core/interfaces/celebrity.model';
import { CelebrityService } from 'src/app/core/services/celebrity.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-celebrity-remark',
  templateUrl: './add-celebrity-remark.component.html',
  styleUrls: ['./add-celebrity-remark.component.scss']
})
export class AddCelebrityRemarkComponent {
  public form!: FormGroup;
  public celebrities: CelebrityIdandName[] = [];
  celebId: number = this.data.id;
  celebName: string = this.data.name;

  private userId: number = this.userService.getID();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private celebrityService: CelebrityService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddCelebrityRemarkComponent>
  ){}

  ngOnInit(): void {
    this.getCelebrities();

    this.form = this.formBuilder.group({
      celebrityId: [this.celebId],
      note: [''],
    });
    /* this.form.get('celebrityId')?.disable(); */
  }

  private getCelebrities(): void {
    this.celebrityService.getCelebritiesIdsandNames().subscribe((data) => {
      this.celebrities = data;
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.celebrityService.createCelebrityRemark({ ...this.form.value, createdById: this.userId }).subscribe((data) => {
        if (data.status === 'success') {
          this.toastr.success(data.message);
          this.dialogRef.close();
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }
}
