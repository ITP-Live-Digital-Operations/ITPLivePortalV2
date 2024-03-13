import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { ROLES, PRIVILEGE_LEVEL } from 'src/app/core/constant/values.constants'
// import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ToastrService } from 'ngx-toastr';
import { teams } from 'src/app/core/interfaces/og.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})

export class RegisterUserComponent implements OnInit {

  public path = PATH;
  public users: any;
  private data: any;
  public roles = ROLES;
  public privilege_level = PRIVILEGE_LEVEL;
  public userForm: FormGroup;

  public teams = teams;

  public locations = ['UAE', 'KSA', 'Beirut', 'India', 'USA']

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      team: [''],
      location: ['', Validators.required],
      privilege_level: ['', Validators.required],
      parentId: [''],
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  public onSubmit(): void {
    if (this.userForm.valid) {

      this.userService
        .register({ ...this.userForm.value, status: 'Active' })
        .subscribe((item) => {
          this.data = item;
          if (this.data.status == 'successs') {
            this.toastrService.success('User added successfully!');
          }
        });
      this.router.navigate([this.path['forms']]);
    } else {
      this.toastrService.warning('User was not added!');
    }
  }
}
