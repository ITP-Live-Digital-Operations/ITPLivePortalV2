import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { agencies, MainTaskType, timeSpent } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-new-time-form',
  templateUrl: './new-time-form.component.html',
  styleUrls: ['./new-time-form.component.scss'],
})

export class NewTimeFormComponent {

  public newTalentTimeForm: FormGroup;
  name!: string;
  userId!: number;
  public agencies = agencies;
  public mainTaskType = MainTaskType;
  public timeSpent = timeSpent;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.newTalentTimeForm = this.formBuilder.group({
      Date: [''],
      Agency: [''],
      Client: [''],
      MainTaskType: [''],
      ExtraNotes: [''],
      TimeSpentInHours: [''],
    });
  }

  ngOnInit(): void {
    this.userId = this.userService.getID();
    this.userService.getUserByID(this.userId).subscribe((response: any) => {
      this.name = response.name;
    });
  }

  public onSubmit(): void {
    this.userService
      .addTimeForm({ user_id: this.userId, ...this.newTalentTimeForm.value })
      .subscribe((response: any) => {
        if (response.status == 'success') {
          this.toastrService.success("Time form added successfully!")
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else{
          this.toastrService.error("Error adding time form!")
        }
      });
  }
}
