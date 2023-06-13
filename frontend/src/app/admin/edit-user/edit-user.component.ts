import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/Services/user.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userID: any
  user: any
  data: any

  updateUserForm: FormGroup;
  roles = ['admin', 'talent', 'sales', 'campaign', 'superadmin']
  privilege_level = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']


  constructor(private activatedRoute : ActivatedRoute, private userService : UserService, private formBuilder: FormBuilder) {
    this.updateUserForm = this.formBuilder.group({
      name: [''],
      email: [''],
      role: [''],
      privilege_level: ['']

    })
  }

  ngOnInit(): void {
    this.loadUserData()
  }

  loadUserData(){
    this.activatedRoute.params.subscribe(params => {
      this.userID = params['id'];
    });
  this.userService.getUserByID(this.userID).subscribe((data:any)=>{
    this.user = data


    if (this.user != null) {
      this.updateUserForm = this.formBuilder.group({
        name: [this.user.name],
        email: [this.user.email],
        role: [this.user.role],
        privilege_level: [this.privilege_level]
      })
    }
  }
  )

}

updateUser() {
  this.userService.updateUser(this.updateUserForm.value, this.userID).subscribe((res:any)=>{
  this.data = res
  if (this.data.status === "success") {
    alertify.success("Influencer updated successfully.")
    window.location.reload();
  }
  else {
    alertify.error("Influencer was not updated");
  }
  })
}



backButton() {
  window.history.back();
}


resetCount(id:any){
  this.userService.resetCount(id).subscribe((res:any)=>{
      if(res){
        alertify.success("Count reset successfully.")

      }
      else{
        alertify.error("Count could not be reset.")
      }

    })
}

}
