import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {

  public passwordMatchError: boolean = false;
  public passwordChangeSuccess: boolean = false;
  public passwordChangeError: boolean = false;

  public updateProfile: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.updateProfile = this.formBuilder.group({
      oldPassword: [''],
      newPassword1: ['', [Validators.required, Validators.minLength(8)]],
      newPassword2: ['', [Validators.required, Validators.minLength(8)]],
    }, { validator: this.matchPassword.bind(this)
    });
  }

  ngOnInit(): void {

  }

  private loadUserData(): void {
   /*  this.activatedRoute.params.subscribe((params) => {
      this.userID = params['id'];
    });
    this.userService.getUserByID(this.userID).subscribe((data: any) => {
      this.user = data;

      if (this.user != null) {
        this.updateProfile = this.formBuilder.group({
          name: [this.user.name],
          email: [this.user.email],
        });
      }
    }); */
  }

  private matchPassword(group: FormGroup): any {
    const newPassword = group.get('newPassword1')?.value;
    const confirmPassword = group.get('newPassword2')?.value;

    this.passwordMatchError = newPassword !== confirmPassword;

    return this.passwordMatchError ? { passwordMismatch: true } : null;
  }

  public updateUser(): void {
    this.userService
    .changePassword({
      oldPassword: this.updateProfile.value.oldPassword,
      newPassword: this.updateProfile.value.newPassword1,
      id: this.userService.getID(),
    })
    .subscribe((response: any) => {
      if (response.status == 'success') {
        this.toastrService.success('Password changed successfully');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.toastrService.error('Error error changing password');
      }
    });
}


}

