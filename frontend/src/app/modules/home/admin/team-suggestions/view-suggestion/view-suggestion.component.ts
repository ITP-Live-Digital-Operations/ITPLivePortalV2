import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SuggestionService } from 'src/app/core/Services/suggestion.service';
import { SuggestionModel } from 'src/app/core/interfaces/suggestions.model';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-view-suggestion',
  templateUrl: './view-suggestion.component.html',
  styleUrls: ['./view-suggestion.component.scss'],
})
export class ViewSuggestionComponent {


  form!: FormGroup;

  suggestionId: number = 0;
  suggestion!: SuggestionModel;

  userId = this.userService.getID();

  constructor(
    private suggestionService: SuggestionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ViewSuggestionComponent>,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.suggestionId = this.data.suggestionId;
    this.fetchSuggestion(this.suggestionId);
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      estimatedTime: ['', Validators.required],
    })
  }

  fetchSuggestion(suggestionId: number) {
    this.suggestionService.getSuggestionById(suggestionId).subscribe(
      (response) => {
        console.log(response.data);
        this.suggestion = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  rejectSuggestion() {
    this.confirmationDialogService
      .openConfirmationDialog(
        'Reject Suggestion',
        'Are you sure you want to reject this suggestion?',
        'yesno'
      )
      .subscribe((confirmation) => {
        if (confirmation) {
          this.suggestionService.rejectSuggestion(this.suggestionId).subscribe(
            (object) => {
              if (object.status === 'success') {
                this.toastr.success('Suggestion rejected successfully');
                this.dialogRef.close();
              }
            },
            (error) => {
              console.error('Error rejecting suggestion: ', error);
            }
          );
        }
      });
  }

  approveSuggestion() {
    this.confirmationDialogService
      .openConfirmationDialog(
        'Approve Suggestion',
        'Are you sure you want to approve this suggestion?',
        'yesno'
      )
      .subscribe((confirmation) => {
        if (confirmation) {
          this.suggestionService.approveSuggestion(this.suggestionId).subscribe(
            (object) => {
              if (object.status === 'success') {
                this.toastr.success('Suggestion approved successfully');
                this.dialogRef.close();
              }
            },
            (error) => {
              console.error('Error approving suggestion: ', error);
            }
          );
        }
      });
  }

  updateEstimatedTime(){
    if(this.form.valid){
      this.suggestionService.updateEstimatedTime(this.suggestionId, this.form.value.estimatedTime).subscribe(
        (object) => {
          if (object.status === 'success') {
            this.toastr.success('Estimated time updated successfully');
            this.form.reset();
            this.fetchSuggestion(this.suggestionId);
          }
        },
        (error) => {
          console.error('Error updating estimated time: ', error);
        }
      );
    }

  }
}
