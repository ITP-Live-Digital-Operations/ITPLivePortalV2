import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  passwordMatchError: boolean = false;
  passwordChangeSuccess: boolean = false;
  passwordChangeError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
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

  ngOnInit(): void {}

  matchPassword(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    this.passwordMatchError = newPassword !== confirmPassword;

    return this.passwordMatchError ? { passwordMismatch: true } : null;
  }

  onSubmit() {
    console.log({
      ...this.changePasswordForm.value,
      id: this.userService.getID(),
    });

    this.userService
      .changePassword({
        oldPassword: this.changePasswordForm.value.oldPassword,
        newPassword: this.changePasswordForm.value.newPassword,
        id: this.userService.getID(),
      })
      .subscribe((response: any) => {
        if (response.status == 'success') {
          // alertify.success('Password changed successfully');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          // alertify.error('Error error changing password');
        }
      });
  }
}
