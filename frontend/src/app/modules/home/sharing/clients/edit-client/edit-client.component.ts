import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandModel, ClientModel, editClientModel } from 'src/app/core/interfaces/client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { UserService } from 'src/app/core/services/user.service';




@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {

  client!: ClientModel
  editedClient!: editClientModel;
  editMode: boolean = false;

  showBrandForm: boolean = false;
  newBrand : any

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id']);
    this.loadClient();
  }

  loadClient() {
    this.clientService.getClientById(this.activatedRoute.snapshot.params['id']).subscribe((client: ClientModel) => {
      this.client = client;
      console.log(this.client);
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  editClientDetails() {
    this.editedClient = {
      name: this.client.name,
      industry: this.client.industry,
      pocName: this.client.pocName,
      pocEmail: this.client.pocEmail,
      pocNumber: this.client.pocNumber,
      updatedBy: this.userService.getID()
    }
    this.clientService.updateClient(this.editedClient, this.client.id).subscribe((res) => {
      if( res.status == 'success'){
        this.toastr.success('Client Details Updated Successfully');
      }
      this.toggleEditMode();
    });
  }

  addBrand(){
    this.clientService.addBrandToClient(this.newBrand, this.userService.getID(), this.client.id).subscribe((res) => {
      if( res.status == 'success'){
        this.toastr.success('Brand Added Successfully');
        this.showBrandForm = false;
        this.loadClient();
      }
    });
  }
}