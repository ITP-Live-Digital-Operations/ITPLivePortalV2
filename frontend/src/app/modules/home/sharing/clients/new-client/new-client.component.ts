import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/core/services/client.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent {

  public newClientForm: FormGroup;
  private userId = this.userService.getID();

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private toastrService: ToastrService,
    private userService: UserService,
    private dialogRef: MatDialogRef<NewClientComponent>
  ) {
    this.newClientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      pocName: [''],
      pocEmail: [''],
      pocNumber: [''],
    });
  }

  ngOnInit(): void {
  }

  public addClient(): void {
    this.clientService.addClient({...this.newClientForm.value, updatedBy : this.userId}).subscribe((response: any) => {
      console.log(response);
      if (response.status == 'success') {
        this.toastrService.success("Client added successfully!")
        this.dialogRef.close();
      }
      else{
        this.toastrService.error("Error adding client!")
      }
    });
  }
}
