import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {

  public changePasswordForm: FormGroup;
  public passwordMatchError: boolean = false;
  public passwordChangeSuccess: boolean = false;
  public passwordChangeError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.matchPassword.bind(this) }
    );
  }

  private matchPassword(group: FormGroup): any {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    this.passwordMatchError = newPassword !== confirmPassword;

    return this.passwordMatchError ? { passwordMismatch: true } : null;
  }

  public onSubmit(): void {

    this.userService
      .changePassword({
        oldPassword: this.changePasswordForm.value.oldPassword,
        newPassword: this.changePasswordForm.value.newPassword,
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
