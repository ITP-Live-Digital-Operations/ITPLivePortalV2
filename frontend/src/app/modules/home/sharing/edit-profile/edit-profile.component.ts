import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  userID!: number;
  user: any;
  data: any;

  updateProfile: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.updateProfile = this.formBuilder.group({
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
        this.updateProfile = this.formBuilder.group({
          name: [this.user.name],
          email: [this.user.email],
        });
      }
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.updateProfile.value, this.userID)
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

  ngOnDestroy(): void {
    this.loadUserData();
  }
}
