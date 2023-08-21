import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PRIVILEGE_LEVEL, ROLES } from 'src/app/core/constant/values.constants';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {

  private userID!: number;
  public user: any;
  private data: any;

  public roles = ROLES;
  public privilege_level = PRIVILEGE_LEVEL;
  public updateUserForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
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

  private loadUserData(): void {
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

  public updateUser(): void {
    this.userService
      .updateUser(this.updateUserForm.value, this.userID)
      .subscribe((res: any) => {
        this.data = res;
        if (this.data.status === 'success') {
          this.toastrService.success('Influencer updated successfully!');
          window.location.reload();
        } else {
          this.toastrService.error('Influencer was not updated!');
        }
      });
  }

  public resetCount(id: number): void {
    this.userService.resetCount(id).subscribe((res: any) => {
      if (res) {
        this.toastrService.success('Count reset successfully!');
      } else {
        this.toastrService.error('Count could not be reset!');
      }
    });
  }

  public resetPassword(id: number): void {
    this.userService.resetPassword(id).subscribe((res: any) => {
      if (res) {
        this.toastrService.success('Password changed successfully!');
      } else {
        this.toastrService.error('Password did not change!');
      }
    });
  }

}
