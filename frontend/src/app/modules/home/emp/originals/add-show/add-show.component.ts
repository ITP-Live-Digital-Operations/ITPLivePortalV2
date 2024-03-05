import { Component, Input } from '@angular/core';
import { FormBuilder,FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OgService } from 'src/app/core/Services/og.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { UserService } from 'src/app/core/services/user.service';
import { FormsModule } from '@angular/forms';
import { ogShowCreate } from 'src/app/core/interfaces/og.model';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.scss'],
})
export class AddShowComponent {

  protected newShowForm !: FormGroup;
  private data : any;
  protected path = PATH;


  
  
  
  constructor(
    private formBuilder : FormBuilder,
    private service: OgService,
    private toastr: ToastrService,
    private userService: UserService,
    private route: Router
  ) {
    this.initializeElements();
  }
  private initializeElements(): void {
    this.newShowForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: [''],
        color: ['', [Validators.required]],
        colorCode: ['', [Validators.required]],
    });
  }
  protected onSubmit(): void {
    console.log(this.newShowForm.value);
    
    if (this.newShowForm.valid) {
      const formData = this.processFormGroups(this.newShowForm) as ogShowCreate;
  
        this.service.addOgShow(formData).subscribe(
          (res) => {
            this.data = res;
            if (this.data.status === 'success') {
              this.route.navigate([this.path['viewShows']]);
              this.toastr.success('Show Added Successfully!');
            } 
          },
          (error) => {
            this.toastr.error('Error adding show');
            console.error(error);
          }
        );
      } 
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

