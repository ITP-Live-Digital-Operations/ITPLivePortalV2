import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/Services/user.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  passwordMatchError: boolean = false;
  passwordChangeSuccess: boolean = false;
  passwordChangeError: boolean = false;

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchPassword.bind(this) });
  }

  ngOnInit(): void {

  }


  matchPassword(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    this.passwordMatchError = newPassword !== confirmPassword;

    return this.passwordMatchError ? { passwordMismatch: true } : null;

  }

  onSubmit() {
    console.log({...this.changePasswordForm.value, id: this.authService.getID()});

    this.authService.changePassword({ oldPassword: this.changePasswordForm.value.oldPassword, newPassword: this.changePasswordForm.value.newPassword, id: this.authService.getID() })
    .subscribe((response: any) => {
      if(response.status == 'success'){
        alertify.success("Password changed successfully")
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      }
      else{
        alertify.error("Error error changing password")
      }

    });

  }


}
