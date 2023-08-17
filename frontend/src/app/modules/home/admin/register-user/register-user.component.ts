import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { ROLES, PRIVILEGE_LEVEL } from 'src/app/core/constant/values.constants'
// import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})

export class RegisterUserComponent implements OnInit {
  users: any;
  data: any;
  roles = ROLES;
  privilege_level = PRIVILEGE_LEVEL;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
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

      this.userService
        .register({ ...this.userForm.value, status: 'Active' })
        .subscribe((item) => {
          this.data = item;
          if (this.data.status == 'successs') {
            // alertify.success('User added successfully');
          }
        });
      this.router.navigate(['home/admin/forms']);
    } else {
      // Show error message to user
    }
  }

  ngOnDestroy(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  backButton() {
    window.history.back();
  }
}
