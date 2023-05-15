import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/Services/user.service';
import * as alertify from 'alertifyjs';
import { LogService } from 'src/app/core/Services/log.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  users: any;
  data: any;
  userForm: FormGroup;
  roles = ['sales', 'talent', 'campaign']
  privilege_level = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      privilege_level: ['', Validators.required],
      parentId: [''],
    });
   }

  ngOnInit(): void {
      this.userService.getAllUsers().subscribe((data) => {


      this.users = data;
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Submit form data to backend
      console.log(this.userForm.value);

      this.userService.register({...this.userForm.value, status : 'Active'}).subscribe((item) => {
        this.data = item;
        if(this.data.status == 'successs'){
          alertify.success('User added successfully');
        }
      });
        this.router.navigate(['home/admin/forms']);
    } else {
      // Show error message to user

    }
  }






  backButton() {
    window.history.back();
  }

}
