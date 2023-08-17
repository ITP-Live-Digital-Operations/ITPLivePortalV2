import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PRIVILEGE_LEVEL, ROLES } from 'src/app/core/constant/values.constants';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  userID!: number;
  user: any;
  data: any;
  roles = ROLES;
  privilege_level = PRIVILEGE_LEVEL;

  updateUserForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.updateUserForm = this.formBuilder.group({
      name: [''],
      email: [''],
      role: [''],
      privilege_level: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.activatedRoute.params.subscribe((params) => {
      this.userID = params['id'];
    });
    this.userService.getUserByID(this.userID).subscribe((data: any) => {
      this.user = data;

      if (this.user != null) {
        this.updateUserForm = this.formBuilder.group({
          name: [this.user.name],
          email: [this.user.email],
          role: [this.user.role],
          privilege_level: [this.privilege_level],
        });
      }
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.updateUserForm.value, this.userID)
      .subscribe((res: any) => {
        this.data = res;
        if (this.data.status === 'success') {
          // alertify.success('Influencer updated successfully.');
          window.location.reload();
        } else {
          // alertify.error('Influencer was not updated');
        }
      });
  }

  resetCount(id: any) {
    this.userService.resetCount(id).subscribe((res: any) => {
      if (res) {
        // alertify.success('Count reset successfully.');
      } else {
        // alertify.error('Count could not be reset.');
      }
    });
  }

  resetPassword(id: any) {
    this.userService.resetPassword(id).subscribe((res: any) => {
      if (res) {
        console.log(res);
      } else {
        console.log("error")
      }
    });
  }

  ngOnDestroy(): void {
    this.loadUserData();
  }

}
