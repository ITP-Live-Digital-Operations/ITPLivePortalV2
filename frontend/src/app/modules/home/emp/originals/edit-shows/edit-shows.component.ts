import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OgService } from 'src/app/core/Services/og.service';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-edit-shows',
  templateUrl: './edit-shows.component.html',
  styleUrls: ['./edit-shows.component.scss'],
})
export class EditShowsComponent {
  public editShowForm!: FormGroup;
  private showData: any;
  private data: any;

  constructor(
    private ogService: OgService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public source :any,
    private toastr: ToastrService,
    private dialogRef : MatDialogRef<EditShowsComponent>,
  ) {
    this.initializeElements();
    this.GetShowData(this.source.id);
  }

  private initializeElements(): void {
    this.editShowForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      color: ['', [Validators.required]],
      colorCode: ['', [Validators.required]],
    });
  }

  private GetShowData(inputdata :any): void{
    this.ogService.getOgShowById(inputdata).subscribe((res) =>{
      console.log(res)
      this.showData = res;
      if(this.showData != null){
        this.editShowForm.setValue({
          name : this.showData.name,
          description : this.showData.description,
          color : this.showData.color,
          colorCode : this.showData.colorCode
        })
      }
    })
  }

  public onSubmit() : void{
    const formValues = this.processFormGroups(this.editShowForm);
    this.ogService.editShowById(this.source.id, formValues).subscribe((res)=>{
      this.data = res;
      if(this.data.status === 'success'){
        this.dialogRef.close();
        this.toastr.success('Show Edited Successfully');
      }else{
        this.toastr.error('Error! Show Not Updated!')
      }
    })
  }

  private processFormGroups(formGroup: FormGroup): any {
    let valuesObject: { [key: string]: any } = {};

    if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls).forEach((key) => {
        const control = formGroup.get(key);
        if (control instanceof FormGroup) {
          valuesObject = { ...valuesObject, ...this.processFormGroups(control) };
        } else if (control instanceof FormControl) {
          valuesObject[key] = control.value;
        }
      });
    }

    return valuesObject;
}
}
