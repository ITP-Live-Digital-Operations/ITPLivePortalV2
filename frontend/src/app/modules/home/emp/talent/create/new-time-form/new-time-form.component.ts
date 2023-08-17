import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { agencies, MainTaskType, timeSpent } from 'src/assets/influencer-form-arrays';
// import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-new-time-form',
  templateUrl: './new-time-form.component.html',
  styleUrls: ['./new-time-form.component.scss'],
})

export class NewTimeFormComponent {
  newTalentTimeForm: FormGroup;
  name!: string;
  userId!: number;
  agencies = agencies;
  mainTaskType = MainTaskType;
  timeSpent = timeSpent;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
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
  onSubmit() {
    this.userService
      .addTimeForm({ user_id: this.userId, ...this.newTalentTimeForm.value })
      .subscribe((response: any) => {
        if (response.status == 'success') {
          // alertify.success("Time form added successfully")
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        // else{
        //   alertify.error("Error adding time form")
        // }
      });
  }

  backButton() {
    window.history.back();
  }
}
