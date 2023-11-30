import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) {
    this.newClientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      industry: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  public addClient(): void {
    this.clientService.addClient({...this.newClientForm.value, updatedBy : this.userId}).subscribe((response: any) => {
      console.log(response);
      if (response.status == 'success') {
        this.toastrService.success("Client added successfully!")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      else{
        this.toastrService.error("Error adding client!")
      }
    });
  }
}
